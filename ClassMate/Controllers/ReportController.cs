using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClassMate.Data;
using ClassMate.Models;
using Azure;
using ClassMate.Dtos;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ClassMate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReportController : ControllerBase, IReportController
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ReportController(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Reports

        [Authorize(Roles = "Teacher,Admin")]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<IEnumerable<Report>>>> GetReports()
        {
            var response = new ServiceResponse<IEnumerable<Report>>();
            var reports = await _context.Reports.ToListAsync();
            response.Data = reports;
            response.Success = true;
            response.Message = "Reports retrieved succesfully";
            return Ok(response);
        }

        // GET: api/Reports/5
        [Authorize(Roles = "Teacher,Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Report>>> GetReport(int id)
        {
            var response = new ServiceResponse<Report>();
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }
            response.Data = report;
            response.Success = true;
            response.Message = "report retrieved succesfully";
            return Ok(response);
        }

        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponse<List<Report>>>> PostReport(ReportDto reportDto)
        {
            var response = new ServiceResponse<List<Report>>();

            try
            {
                // Validate the incoming ReportDto
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Retrieve user and study group from the database
                var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Retrieve the user from the database based on the user ID
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == reportDto.CreatorId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

               

               
                var report = new Report
                {
                    Title = reportDto.Title,
                    Description = reportDto.Description,
                    CreatorId = reportDto.CreatorId,
                    StudyGroupId = reportDto.StudyGroupId,
                    ResourceId = reportDto.ResourceId,
                    AssignmentId = reportDto.AssignmentId,
                    QuizId = reportDto.QuizId,
                    UserId = reportDto.UserId,
                    ChatMessageId = reportDto.ChatMessageId

                };

                // Add Report to the database context and save changes
                _context.Reports.Add(report);
                await _context.SaveChangesAsync();

                // Set the response data
                response.Data = await _context.Reports.ToListAsync();
                response.Success = true;
                response.Message = "Report Created";
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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse<Report>>> UpdateReport(int id, ReportDto updatedReportDto)
        {
            var response = new ServiceResponse<Report>();

            try
            {

                
                // Retrieve the existing assignment from the database based on the provided ID
                var existingReport = await _context.Reports.FindAsync(id);

                if (existingReport == null)
                {
                    // If assignment with the specified ID is not found, return 404 Not Found
                    return NotFound();
                }

                // Update properties of the existing assignment with the values from updatedAssignmentDto
                existingReport.Title = updatedReportDto.Title;
                existingReport.Description = updatedReportDto.Description;
                


                // Save the changes to the database asynchronously
                _context.Reports.Update(existingReport);
                await _context.SaveChangesAsync();

                // Set the updated assignment to the response data
                response.Data = existingReport;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Report Updated Successfully";
            }
            catch (Exception ex)
            {
                // If an exception occurs during database interaction, handle it here
                response.Success = false;
                response.Message = ex.Message; // Provide the exception message in the response
            }

            // Return an HTTP response with the service response object (serialized to JSON)
            return Ok(response);
        }

        // POST: api/Reports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // DELETE: api/Reports/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<Report>>> DeleteReport(int id)
        {

            var response = new ServiceResponse<List<Report>>();
            try
            {
                var report = await _context.Reports.FindAsync(id);

                if (report == null)
                {
                    return NotFound();
                }

                _context.Reports.Remove(report);
                await _context.SaveChangesAsync();

                response.Data = await _context.Reports.ToListAsync();
                response.Success = true;
                response.Message = "Report Deleted";
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("del/{type}/{id}")]
        public async Task<ActionResult<ServiceResponse<List<Report>>>> DeleteReports(string type,string id)
        {

            var response = new ServiceResponse<List<Report>>();
            try
            {
                if (type == null)
                {
                    return NotFound("type not found");
                }
                var reportsToRemove = new List<Report>();
                switch (type)
                {
                    case "StudyGroup":
                        {
                            reportsToRemove = await _context.Reports.Where(r => r.StudyGroupId == id).ToListAsync();
                            break;
                        }

                    case "Assignment":
                        {
                            int number = int.Parse(id);
                            reportsToRemove = await _context.Reports.Where(r => r.AssignmentId == number).ToListAsync();
                            break;
                        }

                    case "User":
                        {
                            reportsToRemove = await _context.Reports.Where(r => r.UserId == id).ToListAsync();
                            break;
                        }

                    case "Resource":
                        {
                            int number = int.Parse(id);
                            reportsToRemove = await _context.Reports.Where(r => r.ResourceId == number).ToListAsync();
                            break;
                        }

                    case "Quiz":
                        {
                            int number = int.Parse(id);
                            reportsToRemove = await _context.Reports.Where(r => r.QuizId == number).ToListAsync();
                            break;
                        }

                    case "ChatMessage":
                        {
                            int number = int.Parse(id);
                            reportsToRemove = await _context.Reports.Where(r => r.ChatMessageId == number).ToListAsync();
                            break;
                        }
                }


                if (reportsToRemove == null)
                {
                    return NotFound();
                }
                _context.Reports.RemoveRange(reportsToRemove);
                await _context.SaveChangesAsync();

                

                response.Data = await _context.Reports.ToListAsync();
                response.Success = true;
                response.Message = "Report Deleted";
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
