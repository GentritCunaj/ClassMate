using ClassMate.Data;
using ClassMate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ClassMate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase, ISubmissionController
    {
        private readonly DataContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public SubmissionController(DataContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        [Route("Submit")]
        public async Task<ActionResult<ServiceResponse<Submission>>> SubmitSubmission(IFormFile submittedFile, int assignmentId)
        {
            var response = new ServiceResponse<Submission>();

            try
            {
                if (submittedFile == null || submittedFile.Length == 0)
                {
                    response.Success = false;
                    response.Message = "No file uploaded.";
                    return BadRequest(response);
                }

                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not authorized.";
                    return Unauthorized(response);
                }

                var submission = new Submission
                {
                    AssignmentId = assignmentId,
                    StudentId = user.Id,
                    FileName = submittedFile.FileName,
                    SubmittedOn = DateTime.Now,
                    IsSubmitted = true
                };

                using (var memoryStream = new MemoryStream())
                {
                    await submittedFile.CopyToAsync(memoryStream);
                    submission.SubmittedFile = memoryStream.ToArray();
                }

                _db.Submissions.Add(submission);
                await _db.SaveChangesAsync();

                response.Data = submission;
                response.Success = true;
                response.Message = "Submission successful";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = ex.Message;
                return StatusCode(500, response); // Return 500 status code with error message
            }

            return Ok(response);
        }
    }
}
