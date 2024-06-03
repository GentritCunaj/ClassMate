using ClassMate.Data;
using ClassMate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<ServiceResponse<Submission>>> SubmitSubmission([FromForm] IFormFile submittedFile, [FromForm] int assignmentId)
        {
            var response = new ServiceResponse<Submission>();

            try
            {
                Console.WriteLine("Received File: " + (submittedFile != null ? submittedFile.FileName : "No file")); // Debugging statement
                Console.WriteLine("Assignment ID: " + assignmentId); // Debugging statement

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

                var assignment = await _db.Assignments.FindAsync(assignmentId);
                if (assignment == null)
                {
                    response.Success = false;
                    response.Message = "Assignment not found.";
                    return NotFound(response);
                }

                if (DateTime.Now > assignment.DueDate)
                {
                    response.Success = false;
                    response.Message = "The due date for this assignment has passed.";
                    return BadRequest(response);
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
                response.Success = false;
                response.Message = ex.Message;
                return StatusCode(500, response);
            }

            return Ok(response);
        }

        [HttpGet]
        [Authorize]
        [Route("GetSubmissions/{assignmentId}")]
        public async Task<ActionResult<ServiceResponse<List<SubmissionDto>>>> GetSubmissions(int assignmentId)
        {
            var response = new ServiceResponse<List<SubmissionDto>>();

            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not authorized.";
                    return Unauthorized(response);
                }

                var assignment = await _db.Assignments.FindAsync(assignmentId);
                if (assignment == null)
                {
                    response.Success = false;
                    response.Message = "Assignment not found.";
                    return NotFound(response);
                }

                // Check if the user requesting the submissions is the teacher who created the assignment
                var isTeacher = await _userManager.IsInRoleAsync(user, "Teacher");
                if (!isTeacher && assignment.TeacherId != user.Id)
                {
                    response.Success = false;
                    response.Message = "Unauthorized to access submissions for this assignment.";
                    return Unauthorized(response);
                }

                // Retrieve submissions for the specified assignment, including the Student navigation property
                var submissions = await _db.Submissions
                    .Include(s => s.Student)
                    .Where(s => s.AssignmentId == assignmentId)
                    .ToListAsync();

                // Map the submissions to SubmissionDto
                var submissionDtos = submissions.Select(s => new SubmissionDto
                {
                    SubmissionId = s.SubmissionId,
                    AssignmentId = s.AssignmentId,
                    StudentId = s.StudentId,
                    StudentName = s.Student.UserName, // Assuming UserName is stored in the ApplicationUser model
                    FileName = s.FileName,
                    SubmittedOn = s.SubmittedOn
                    // You can include additional properties as needed
                }).ToList();

                response.Data = submissionDtos;
                response.Success = true;
                response.Message = "Submissions retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                return StatusCode(500, response);
            }

            return Ok(response);
        }

        [HttpGet]
[Authorize]
[Route("DownloadSubmission/{submissionId}")]
public async Task<IActionResult> DownloadSubmission(int submissionId)
{
    try
    {
        var submission = await _db.Submissions.FindAsync(submissionId);
        if (submission == null)
        {
            return NotFound("Submission not found.");
        }

        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized("User not authorized.");
        }

        // Check if the user is authorized to download this submission
        if (user.Id != submission.StudentId)
        {
            var isTeacher = await _userManager.IsInRoleAsync(user, "Teacher");
            if (!isTeacher)
            {
                return Unauthorized("User not authorized to download this submission.");
            }
        }

        // Return the submission file as a file stream
        return File(submission.SubmittedFile, "application/octet-stream", submission.FileName);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

    }
}

    