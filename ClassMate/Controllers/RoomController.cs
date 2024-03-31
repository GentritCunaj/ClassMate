﻿

using Azure;
using ClassMate.Data;
using ClassMate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Diagnostics.Metrics;
using System.Security.Claims;
using static ClassMate.Models.StudyGroup;

namespace ClassMate.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class RoomController : ControllerBase, IRoomController
    {
        private readonly DataContext _db;
  
        private readonly IHttpContextAccessor _context;

        public RoomController(DataContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
            IAuthentication authentication, IHttpContextAccessor context, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
      
        }


     [HttpGet("publicRooms")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetPublicStudyGroups()
        {
            var response = new ServiceResponse<IEnumerable<StudyGroup>>();

            
            var publicStudyGroups = await _db.StudyGroups
                .Where(sg => sg.Visibility == StudyGroup.VisibilityEnum.Public)
                .ToListAsync();

            response.Data = publicStudyGroups;
            response.Success = true;
            response.Message = "Public study groups retrieved successfully.";
            return Ok(response);
        }

        [HttpPost]

        public async Task<ActionResult<ServiceResponse<List<StudyGroup>>>> PostStudyGroup(StudyGroupDto studyGroupDto)
        {
            var response = new ServiceResponse<List<StudyGroup>>();
            
            var user = _db.Users.FirstOrDefault(u => u.Id == studyGroupDto.CreatorId);
            var studyGroup = new StudyGroup
            {
                StudyGroupId = studyGroupDto.StudyGroupId,
                CreatorId = user.Id,
                GroupName = studyGroupDto.GroupName,
                Description = studyGroupDto.Description,
                Visibility = studyGroupDto.Visibility,
                Type = studyGroupDto.Type,
                Creator = user // Set the Creator property with the fetched user
            };

            try
            {
             
                // Assuming 'studyGroup' is the instance of StudyGroup that you want to add
                _db.StudyGroups.Add(studyGroup);
                await _db.SaveChangesAsync();
               
                response.Data = await _db.StudyGroups.ToListAsync(); 
                response.Success = true;
                response.Message = "Study Group Created";
               
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Data = await _db.StudyGroups.ToListAsync();
                response.Success = false;
                response.Message = ex.ToString();

            }
            return Ok(response);


        }



    }
}
