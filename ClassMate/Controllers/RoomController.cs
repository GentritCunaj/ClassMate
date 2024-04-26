

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
        private UserManager<ApplicationUser> _userManager;

        public RoomController(DataContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
            IAuthentication authentication, IHttpContextAccessor context, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _db = db;
      
        }

        [Authorize(Roles = "Student,Teacher,Admin")]
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


        [Authorize(Roles = "Student,Teacher")]
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<StudyGroup>>>> PostStudyGroup(StudyGroupDto studyGroupDto)
        {
            var response = new ServiceResponse<List<StudyGroup>>();


            if (!Enum.TryParse(typeof(StudyGroup.VisibilityEnum), studyGroupDto.Visibility, out var visibility))
            {
                return BadRequest("Invalid visibility type.");
            }

            // Convert string representation of type to enum value
            if (!Enum.TryParse(typeof(StudyGroup.TypeEnum), studyGroupDto.Type, out var type))
            {
                return BadRequest("Invalid group type.");
            }



            var user = _db.Users.FirstOrDefault(u => u.Id == studyGroupDto.CreatorId);
            var studyGroup = new StudyGroup
            {
                StudyGroupId = studyGroupDto.StudyGroupId,
                CreatorId = user.Id,
                GroupName = studyGroupDto.GroupName,
                Description = studyGroupDto.Description,
                Visibility = (StudyGroup.VisibilityEnum)visibility,
                Reports = studyGroupDto.Reports,
                Type = (StudyGroup.TypeEnum)type,
                Creator = user 
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

     

        [Authorize(Roles = "Student,Teacher,Admin")]
        [HttpPost("report")]
        public async Task<ActionResult<ServiceResponse<StudyGroup>>> ReportStudyGroup(string studyGroupId)
        {
            var response = new ServiceResponse<StudyGroup>();

            try
            {
                var studyGroup = await _db.StudyGroups.FindAsync(studyGroupId);
                if (studyGroup == null)
                {
                    response.Success = false;
                    response.Message = "Study group not found.";
                    return NotFound(response);
                }

                studyGroup.Reports++; // Increment report count
                await _db.SaveChangesAsync();

                response.Data = studyGroup;
                response.Success = true;
                response.Message = "Study group reported successfully.";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Error reporting study group: {ex.Message}";
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost("studentFromStudyGroup")]
        public async Task<ActionResult<ServiceResponse<string>>> AddStudentToStudyGroup(UserStudy userStudy)
        {
            var response = new ServiceResponse<string>();
           
            try
            {
                // Find the user by their ID
                var user = await _userManager.FindByIdAsync(userStudy.StudentId);
                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not found.";
                    return response;
                }

                // Find the association entry in the UserStudyGroup table
                var studyGroup = await _db.StudyGroups
                    .FirstOrDefaultAsync(s => s.StudyGroupId == userStudy.StudyGroupId);

                if (studyGroup == null)
                {
                    response.Success = false;

                    response.Message = "Study Group doesnt exist";
                    return response;
                }

                var userStudyGroup = new UserStudyGroup
                {
                    UserId =  userStudy.StudentId,
                    StudyGroupId = userStudy.StudyGroupId
                };

                _db.UserStudyGroups.Add(userStudyGroup);
                await _db.SaveChangesAsync();

                response.Success = true;

                response.Message = "You've been added to the study group successfully.";

                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"{ex.Message}";
                return response;
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("studyGroupsWithMultipleReports")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetStudyGroupsWithMultipleReports()
        {
            var response = new ServiceResponse<IEnumerable<StudyGroup>>();

            try
            {
                var studyGroupsWithMultipleReports = await _db.StudyGroups
                    .Where(sg => sg.Reports > 1) // Filter study groups with more than 1 report
                    .ToListAsync();

                response.Data = studyGroupsWithMultipleReports;
                response.Success = true;
                response.Message = "Study groups with more than 1 report retrieved successfully.";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Error retrieving study groups with multiple reports: {ex.Message}";
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{studyGroupId}")]
        public async Task<ActionResult<ServiceResponse<StudyGroup>>> DeleteStudyGroup(string studyGroupId)
        {
            var response = new ServiceResponse<List<StudyGroup>>();

            try
            {
                var studyGroup = await _db.StudyGroups.FindAsync(studyGroupId);
                if (studyGroup == null)
                {
                    response.Success = false;
                    response.Message = "Study group not found.";
                    return NotFound(response);
                }

                _db.StudyGroups.Remove(studyGroup);
                await _db.SaveChangesAsync();

                response.Data = await _db.StudyGroups.ToListAsync();
                response.Success = true;
                response.Message = "Study group deleted successfully.";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Error deleting study group: {ex.Message}";
                return StatusCode(500, response);
            }
        }

    }
}
