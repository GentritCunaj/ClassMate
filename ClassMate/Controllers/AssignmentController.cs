
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
using static ClassMate.Models.Assignment;

namespace ClassMate.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase, IAssignmentController
    {
        private readonly DataContext _db;

        public AssignmentController(DataContext db)
        {
            _db = db;
        }



        [HttpPost]
        public async Task<ActionResult<ServiceResponse<AssignmentDto>>>PostAssignment(AssignmentDto assignmentDto)
        {
            var response = new ServiceResponse<AssignmentDto>();
            
            var user = _db.Users.FirstOrDefault(u => u.Id == assignmentDto.TeacherId);
            var assignment = new Assignment { 
            
                TeacherId = user.Id,
                Title = assignmentDto.Title,
                Description = assignmentDto.Description,
                DueDate =assignmentDto.DueDate,
                Teacher = user // Set the Creator property with the fetched user
            };

            try
            {
             
                
                _db.Assignments.Add(assignment);
                await _db.SaveChangesAsync();
               
                response.Data = assignmentDto; 
                response.Success = true;
                response.Message = "Assignment Created";
               
            }
          

                catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

        
            return Ok(response);


        }
    }

}
