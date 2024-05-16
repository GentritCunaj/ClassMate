
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



        [Authorize(Roles = "Teacher")]

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Assignment>>>> GetAllAssignments()
        {
            var response = new ServiceResponse<List<Assignment>>();

            try
            {
                // Retrieve all assignments from the database asynchronously
                var assignments = await _db.Assignments.ToListAsync();

                // Set the retrieved assignments to the response data
                response.Data = assignments;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Assignments Retrieved Successfully";
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
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Assignment>>> GetAssignmentById(int id)
        {
            var response = new ServiceResponse<Assignment>();

            try
            {
                // Retrieve the assignment from the database based on the provided ID
                var assignment = await _db.Assignments.FindAsync(id);

                if (assignment == null)
                {
                    // If assignment with the specified ID is not found, return 404 Not Found
                    return NotFound();
                }

                // Set the retrieved assignment to the response data
                response.Data = assignment;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Assignment Retrieved Successfully";
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


        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<Assignment>>>> PostAssignment(AssignmentDto assignmentDto)
        {
            var response = new ServiceResponse<List<Assignment>>();

            
            var user = _db.Users.FirstOrDefault(u => u.Id == assignmentDto.TeacherId);
            var assignment = new Assignment { 
            
                TeacherId = user.Id,
                Title = assignmentDto.Title,
                Description = assignmentDto.Description,
                DueDate =assignmentDto.DueDate,
                Teacher = user,// Set the Creator property with the fetched user
                SubjectId=assignmentDto.SubjectId
            };

            try
            {
             
                
                _db.Assignments.Add(assignment);
                await _db.SaveChangesAsync();
               

                response.Data = await _db.Assignments.ToListAsync(); 
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

        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse<Assignment>>> UpdateAssignment(int id, AssignmentDto updatedAssignmentDto)
        {
            var response = new ServiceResponse<Assignment>();

            try
            {
                // Retrieve the existing assignment from the database based on the provided ID
                var existingAssignment = await _db.Assignments.FindAsync(id);

                if (existingAssignment == null)
                {
                    // If assignment with the specified ID is not found, return 404 Not Found
                    return NotFound();
                }

                // Update properties of the existing assignment with the values from updatedAssignmentDto
                existingAssignment.Title = updatedAssignmentDto.Title;
                existingAssignment.Description = updatedAssignmentDto.Description;
                existingAssignment.DueDate = updatedAssignmentDto.DueDate;

                // Save the changes to the database asynchronously
                _db.Assignments.Update(existingAssignment);
                await _db.SaveChangesAsync();

                // Set the updated assignment to the response data
                response.Data = existingAssignment;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Assignment Updated Successfully";
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
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> DeleteAssignment(int id)
        {
            var response = new ServiceResponse<string>();

            try
            {
                // Retrieve the assignment from the database based on the provided ID
                var assignmentToDelete = await _db.Assignments.FindAsync(id);

                if (assignmentToDelete == null)
                {
                    // If assignment with the specified ID is not found, return 404 Not Found
                    return NotFound();
                }

                // Remove the assignment from the database
                _db.Assignments.Remove(assignmentToDelete);
                await _db.SaveChangesAsync();

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Assignment Deleted Successfully";
                response.Data = $"Assignment with ID {id} has been deleted";
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




    }

}
