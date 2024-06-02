

using Azure;
using ClassMate.Data;
using ClassMate.Dtos;
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

        [HttpGet("subjects")]
        public async Task<ActionResult<ServiceResponse<List<Subject>>>> GetAllSubjects()
        {
            var response = new ServiceResponse<List<Subject>>();

            try
            {
                // Retrieve all assignments from the database asynchronously
                var subjects = await _db.Subjects.ToListAsync();

                // Set the retrieved assignments to the response data
                response.Data = subjects;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Subjects Retrieved Successfully";
            }
            catch (Exception ex)
            {
                // If an exception occurs during database interaction, handle it here
                response.Success = false;
                response.Message = ex.Message; // Provide the exception message in the response
            }

            // Return an HTTP response with the service response object (serialized to JSON)
            return response;
        }

   
        [HttpGet("publicRooms")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetPublicStudyGroups()
        {
            var response = new ServiceResponse<IEnumerable<StudyGroup>>();

            
            var publicStudyGroups = await _db.StudyGroups
                .Where(sg => sg.Visibility == StudyGroup.VisibilityEnum.Public).Include(i => i.Creator)
                .ToListAsync();

            response.Data = publicStudyGroups;
            response.Success = true;
            response.Message = "Public study groups retrieved successfully.";
            return Ok(response);
        }

        [HttpGet("privateRooms")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetPrivateStudyGroups()
        {
            var response = new ServiceResponse<IEnumerable<StudyGroup>>();

            var user = await _userManager.GetUserAsync(User);
            var userId = user.Id;

            var privateStudyGroups = await _db.StudyGroups
                .Where(sg => sg.Visibility == StudyGroup.VisibilityEnum.Private && sg.CreatorId == userId).Include(i => i.Creator)
                .ToListAsync();

            response.Data = privateStudyGroups;
            response.Success = true;
            response.Message = "Private study groups retrieved successfully.";
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

     
        [HttpPost("addSubject")]
        public async Task<ActionResult<ServiceResponse<List<Subject>>>> PostSubject(SubjectDto subject)
        {
            var response = new ServiceResponse<List<Subject>>();
            Subject newSubject = new Subject{
                Name = subject.Name,
                Description = subject.Description,
            };
            _db.Subjects.Add(newSubject);
            await _db.SaveChangesAsync();
            var subjects = await _db.Subjects.ToListAsync();
            response.Data = subjects;
            response.Message = "Subject added";
            response.Success = true;
            return response;

        }

        [HttpDelete("deleteSubject/{id}")]
        public async Task<ActionResult<ServiceResponse<List<Subject>>>> DeleteSubject(int id)
        {
            var response = new ServiceResponse<List<Subject>>();


            try
            {
                var subject = await _db.Subjects.FindAsync(id);
                if (subject == null)
                {
                    response.Success = false;
                    response.Message = "Subject not found.";
                    return NotFound(response);
                }


                _db.Subjects.Remove(subject);
                await _db.SaveChangesAsync();

                response.Data = await _db.Subjects.ToListAsync();
                response.Success = true;
                response.Message = "Subject deleted successfully.";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"Error deleting Subject: {ex.Message}";
                return StatusCode(500, response);
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
