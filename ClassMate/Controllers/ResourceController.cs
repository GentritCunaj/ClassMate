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
    public class ResourceController : ControllerBase, IResourceController
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ResourceController(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Resources

        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<IEnumerable<Resource>>>> GetResources()
        {
            var response = new ServiceResponse<IEnumerable<Resource>>();
             var resources=  await _context.Resources.ToListAsync();
            response.Data = resources;
            response.Success= true;
            response.Message = "Resources retrieved succesfully";
            return Ok(response);
        }

        // GET: api/Resources/5
        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Resource>>> GetResource(int id)
        {
            var response = new ServiceResponse<Resource>();
            var resource = await _context.Resources.FindAsync(id);
            
            if (resource == null)
            {
                return NotFound();
            }
            response.Data = resource;
            response.Success = true;
            response.Message = "Resources retrieved succesfully";
            return Ok(response);
        }

        [Authorize(Roles = "Teacher,Admin")]
        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponse<List<Resource>>>> PostResource(ResourceDto resourceDto)
        {
            var response = new ServiceResponse<List<Resource>>();

            try
            {
                // Validate the incoming resourceDto
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Retrieve user and study group from the database
                var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Retrieve the user from the database based on the user ID
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == resourceDto.UserId);
                var studyGroup = await _context.StudyGroups.FirstOrDefaultAsync(s => s.StudyGroupId == resourceDto.StudyGroupId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                if (studyGroup == null)
                {
                    return NotFound("Study group not found");
                }

                // Process file input if present
                string fileUrl = null;
                if (resourceDto.FileInput != null && resourceDto.FileInput.Length > 0)
                {
                    // Generate a unique file name or use other logic to manage file storage
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(resourceDto.FileInput.FileName);
                    var filePath = Path.Combine("uploads", fileName); // Path to the uploads directory

                    // Save the file to disk
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await resourceDto.FileInput.CopyToAsync(stream);
                    }

                    // Set the file URL
                    fileUrl = Path.Combine("/", "uploads", fileName);
                }

                // Create a new Resource object
                var resource = new Resource
                {
                    StudyGroupId = resourceDto.StudyGroupId,
                    UserId = resourceDto.UserId,
                    Title = resourceDto.Title,
                    Description = resourceDto.Description,
                    FileUrl = fileUrl,
                    User = user,
                    StudyGroup = studyGroup,
                    FileInput = resourceDto.FileInput
                };

                // Add resource to the database context and save changes
                _context.Resources.Add(resource);
                await _context.SaveChangesAsync();

                // Set the response data
                response.Data = await _context.Resources.ToListAsync();
                response.Success = true;
                response.Message = "Resource Created";
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

        [Authorize(Roles = "Teacher,Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse<Resource>>> UpdateResource(int id, ResourceDto updatedResourceDto)
        {
            var response = new ServiceResponse<Resource>();

            try
            {

                string fileUrl = null;
                if (updatedResourceDto.FileInput != null && updatedResourceDto.FileInput.Length > 0)
                {
                    // Generate a unique file name or use other logic to manage file storage
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(updatedResourceDto.FileInput.FileName);
                    var filePath = Path.Combine("uploads", fileName); // Path to the uploads directory

                    // Save the file to disk
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await updatedResourceDto.FileInput.CopyToAsync(stream);
                    }

                    // Set the file URL
                    fileUrl = Path.Combine("/", "uploads", fileName);
                }
                // Retrieve the existing assignment from the database based on the provided ID
                var existingResource = await _context.Resources.FindAsync(id);

                if (existingResource == null)
                {
                    // If assignment with the specified ID is not found, return 404 Not Found
                    return NotFound();
                }

                // Update properties of the existing assignment with the values from updatedAssignmentDto
                existingResource.Title = updatedResourceDto.Title;
                existingResource.Description = updatedResourceDto.Description;
                existingResource.FileUrl = fileUrl;
                existingResource.FileInput = updatedResourceDto.FileInput;


                // Save the changes to the database asynchronously
                _context.Resources.Update(existingResource);
                await _context.SaveChangesAsync();

                // Set the updated assignment to the response data
                response.Data = existingResource;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Resource Updated Successfully";
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

        // POST: api/Resources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // DELETE: api/Resources/5
        [Authorize(Roles = "Teacher,Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<Resource>>> DeleteResource(int id)
        {

            var response = new ServiceResponse<List<Resource>>();
            try
            {
                var resource = await _context.Resources.FindAsync(id);

                if (resource == null)
                {
                    return NotFound();
                }

                _context.Resources.Remove(resource);
                await _context.SaveChangesAsync();

                response.Data = await _context.Resources.ToListAsync();
                response.Success = true;
                response.Message = "Resource Deleted";
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
        [HttpDelete("del/{id}")]
        public async Task<ActionResult<ServiceResponse<List<Report>>>> DeleteResources(string id)
        {

            var response = new ServiceResponse<List<Report>>();
            try
            {
               
                var resourcesToRemove = await _context.Resources.Where(r => r.StudyGroupId == id).ToListAsync();
                


                if (resourcesToRemove == null)
                {
                    return NotFound();
                }
                _context.Resources.RemoveRange(resourcesToRemove);
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
