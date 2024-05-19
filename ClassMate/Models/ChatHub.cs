using ClassMate.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NuGet.Common;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ClassMate.Models
{

    public class ChatHub:Hub
    {
        private readonly DataContext _context;
        private static readonly ConcurrentDictionary<string, (ApplicationUser User, string GroupId)> OnlineUsers = new ConcurrentDictionary<string, (ApplicationUser User, string GroupId)>();
        private readonly IHttpContextAccessor _httpcontext;
        public ChatHub(DataContext context, IHttpContextAccessor httpcontext)
        {
            _context = context;
            _httpcontext = httpcontext;
        }

        public async Task SendMessage(string userId, string message, string groupId)
        {
           
            StudyGroup s = await _context.StudyGroups.FirstOrDefaultAsync(c => c.StudyGroupId == groupId);
           
            ApplicationUser applicationUser = await _context.Users.FirstOrDefaultAsync(c => c.Id == userId);
            var chatMessage = new ChatMessage
            {
                Creator = applicationUser,
                CreatorId = applicationUser.Id,
                Message = message,
                Timestamp = DateTime.Now,
                StudyGroupId = groupId,
                StudyGroup = s
            };
            _context.ChatMessages.Add(chatMessage);
            await _context.SaveChangesAsync();

            await Clients.Group(groupId.ToString()).SendAsync("ReceiveMessage",applicationUser, message,DateTime.Now);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var groupId = httpContext.Request.Query["groupId"].ToString();
            var accessToken = httpContext.Request.Query["access_token"];

            if (!string.IsNullOrEmpty(groupId))
            {
                var userId = GetUserIdFromAccessToken(accessToken);
                if (userId != null)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                    if (user != null)
                    {
                        OnlineUsers.TryAdd(Context.ConnectionId, (user, groupId));

                        // Join the group
                        await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

                        // Broadcast the updated online users list to the group
                        var onlineUsersInGroup = OnlineUsers.Values.Where(u => u.GroupId == groupId).Select(u => u.User).ToList();
                        await Clients.Group(groupId).SendAsync("UpdateOnlineUsers", onlineUsersInGroup);

                        // Load and send the group messages to the connected client
                        var messages = await _context.ChatMessages
                            .Where(m => m.StudyGroupId == groupId)
                            .Include(m => m.Creator)
                            .OrderBy(m => m.Timestamp)
                            .ToListAsync();

                        await Clients.Caller.SendAsync("LoadMessages", messages);
                    }
                }
            }

            await base.OnConnectedAsync();
        }



        public async Task JoinGroup(string groupId, string accessToken)
        {
            var userId = GetUserIdFromAccessToken(accessToken);
            if (userId != null)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user != null)
                {
                    OnlineUsers.TryAdd(Context.ConnectionId, (user, groupId));

                    // Join the group
                    await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

                    // Broadcast the updated online users list to the group
                    var onlineUsersInGroup = OnlineUsers.Values.Where(u => u.GroupId == groupId).Select(u => u.User).ToList();
                    await Clients.Group(groupId).SendAsync("UpdateOnlineUsers", onlineUsersInGroup);

                    // Load and send the group messages to the connected client
                    var messages = await _context.ChatMessages
                        .Where(m => m.StudyGroupId == groupId)
                        .Include(m => m.Creator)
                        .OrderBy(m => m.Timestamp)
                        .ToListAsync();

                    await Clients.Caller.SendAsync("LoadMessages", messages);
                }
            }
        }


        public async Task LeaveGroup(string groupId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);
        OnlineUsers.TryRemove(Context.ConnectionId, out _);
        await Clients.Group(groupId).SendAsync("UpdateOnlineUsers", GetOnlineUsers(groupId));
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        if (OnlineUsers.TryRemove(Context.ConnectionId, out var userConnection))
        {
            await Clients.Group(userConnection.GroupId).SendAsync("UpdateOnlineUsers", GetOnlineUsers(userConnection.GroupId));
        }

        await base.OnDisconnectedAsync(exception);
    }

    private List<ApplicationUser> GetOnlineUsers(string groupId)
    {
        return OnlineUsers.Values
            .Where(uc => uc.GroupId == groupId)
            .Select(uc => uc.User)
            .Distinct()
            .ToList();
    }


    private string GetUserIdFromAccessToken(string accessToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadToken(accessToken) as JwtSecurityToken;

        var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        return userIdClaim?.Value;
    }

    }
}
