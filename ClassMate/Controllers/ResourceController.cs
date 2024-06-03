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
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;
using Humanizer.Localisation;


namespace ClassMate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase, IResourceController
    {
        private readonly StorageClient _storageClient;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ResourceController(DataContext context, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment, StorageClient  storageClient)
        {
            _storageClient=storageClient;
            _hostingEnvironment = hostingEnvironment;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Resources
        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Resource>>>> GetResources()
        {
            var response = new ServiceResponse<List<Resource>>();
            try
            {
                // Retrieve all resources from the database
                var resources = await _context.Resources.Include(r=> r.User).ToListAsync();

                // Set the response data with the retrieved resources
                response.Data = resources;
                response.Success = true;
                response.Message = "Resources retrieved successfully";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = "An error occurred while retrieving the resources. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                // Return 500 status code with error message
                return StatusCode(500, response);
            }

            // Return 200 OK response with the resources data
            return Ok(response);
        }

        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpGet("subjects/{subject}")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<Resource>>>> GetResourcesBySubject(int subject)
        {
            var response = new ServiceResponse<IEnumerable<Resource>>();
            try
            {
                // Retrieve all resources from the database
                var resources = await _context.Resources.Include(r=> r.User).Where(r => r.SubjectId == subject).ToListAsync();

                // Set the response data with the retrieved resources
                response.Data = resources;
                response.Success = true;
                response.Message = "Resources retrieved successfully";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = "An error occurred while retrieving the resources. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                // Return 500 status code with error message
                return StatusCode(500, response);
            }

            // Return 200 OK response with the resources data
            return Ok(response);
        }

        [Authorize(Roles = "Teacher,Admin,Student")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Resource>>> GetResource(int id)
        {
            var response = new ServiceResponse<Resource>();
            try
            {
                // Retrieve the resource from the database based on the provided ID
                var resource = await _context.Resources.FindAsync(id);

                if (resource == null)
                {
                    // If the resource is not found, return a 404 Not Found response
                    return NotFound("Resource not found");
                }

                // Set the response data with the retrieved resource
                response.Data = resource;
                response.Success = true;
                response.Message = "Resource retrieved successfully";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = "An error occurred while retrieving the resource. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                // Return 500 status code with error message
                return StatusCode(500, response);
            }

            // Return 200 OK response with the resource data
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
                

                if (user == null)
                {
                    return NotFound("User not found");
                }

               

                // Process file input if present
                string fileUrl = null;
                if (resourceDto.FileInput != null && resourceDto.FileInput.Length > 0)
                {
                    // Generate a unique file name or use other logic to manage file storage
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(resourceDto.FileInput.FileName);

                    // Upload the file to Google Cloud Storage
                    using (var memoryStream = new MemoryStream())
                    {
                        await resourceDto.FileInput.CopyToAsync(memoryStream);
                        var objectName = $"uploads/{fileName}"; // Adjust the path as needed
                        _storageClient.UploadObject("class-mate-1", objectName, null, memoryStream);
                        fileUrl = $"https://storage.googleapis.com/class-mate-1/{objectName}";
                    }
                }

                // Create a new Resource object
                var resource = new Resource
                {
                    UserId = resourceDto.UserId,
                    Title = resourceDto.Title,
                    Description = resourceDto.Description,
                    FileUrl = fileUrl, // Assign the file URL obtained from Google Cloud Storage
                    User = user,
                    SubjectId = resourceDto.SubjectId,
                    FileInput = resourceDto.FileInput
                };

                // Add resource to the database context
                _context.Resources.Add(resource);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Set the response data
                response.Data = await _context.Resources.Include(r => r.User).ToListAsync();
                response.Success = true;
                response.Message = "Resource Created";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = "An error occurred while saving the entity changes. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                return StatusCode(500, response); // Return 500 status code with error message
            }

            return Ok(response);
        }


        [Authorize(Roles = "Teacher,Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse<List<Resource>>>> UpdateResource(int id, ResourceDto updatedResourceDto)
        {
            var response = new ServiceResponse<List<Resource>>();

            try
            {
                // Validate the incoming resourceDto
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Retrieve the existing resource from the database based on the provided ID
                var existingResource = await _context.Resources.FindAsync(id);

                if (existingResource == null)
                {
                    // If resource with the specified ID is not found, return 404 Not Found
                    return NotFound("Resource not found");
                }

                // Process file input if present
                string fileUrl = existingResource.FileUrl; // Keep the existing file URL if no new file is uploaded
                if (updatedResourceDto.FileInput != null && updatedResourceDto.FileInput.Length > 0)
                {
                    // Generate a unique file name or use other logic to manage file storage
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(updatedResourceDto.FileInput.FileName);

                    // Upload the file to Google Cloud Storage
                    using (var memoryStream = new MemoryStream())
                    {
                        await updatedResourceDto.FileInput.CopyToAsync(memoryStream);
                        var objectName = $"uploads/{fileName}"; // Adjust the path as needed
                        _storageClient.UploadObject("class-mate-1", objectName, null, memoryStream);
                        fileUrl = $"https://storage.googleapis.com/class-mate-1/{objectName}";
                    }
                }

                // Update properties of the existing resource with the values from updatedResourceDto
                existingResource.Title = updatedResourceDto.Title;
                existingResource.Description = updatedResourceDto.Description;
                existingResource.FileUrl = fileUrl;

                // Save the changes to the database asynchronously
                _context.Resources.Update(existingResource);
                await _context.SaveChangesAsync();

                // Set the updated resource to the response data
                response.Data = await _context.Resources.Include(r => r.User).ToListAsync();

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Resource Updated Successfully";
            }
            catch (Exception ex)
            {
                // If an exception occurs during database interaction, handle it here
                response.Success = false;
                response.Message = "An error occurred while saving the entity changes. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                return StatusCode(500, response); // Return 500 status code with error message
            }

            // Return an HTTP response with the service response object (serialized to JSON)
            return Ok(response);
        }


        // POST: api/Resources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        

        [Authorize(Roles = "Teacher,Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<Resource>>>> DeleteResource(int id)
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

                response.Data = await _context.Resources.Include(r => r.User).ToListAsync();
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
        public async Task<ActionResult<ServiceResponse<List<Report>>>> DeleteResources(int id)
        {
            var response = new ServiceResponse<List<Report>>();
            try
            {
                var resourcesToRemove = await _context.Resources.Where(r => r.SubjectId == id).ToListAsync();

                if (resourcesToRemove == null || !resourcesToRemove.Any())
                {
                    return NotFound("No resources found for the given subject ID");
                }

                // Delete the files from Google Cloud Storage if they exist
                foreach (var resource in resourcesToRemove)
                {
                    if (!string.IsNullOrEmpty(resource.FileUrl))
                    {
                        var objectName = resource.FileUrl.Replace("https://storage.googleapis.com/class-mate-1/", "");
                        _storageClient.DeleteObject("class-mate-1", objectName);
                    }
                }

                _context.Resources.RemoveRange(resourcesToRemove);
                await _context.SaveChangesAsync();

                response.Data = await _context.Reports.Include(r => r.User).Include(r => r.Creator).Include(r => r.StudyGroup).Include(r => r.Assignment).Include(r => r.ChatMessage).Include(r => r.Resource).Include(r => r.Quiz).ToListAsync();
                response.Success = true;
                response.Message = "Resources Deleted";
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as per your application's requirement
                response.Success = false;
                response.Message = "An error occurred while deleting the resources. See the inner exception for details.";

                // Log the inner exception details for diagnostic purposes
                if (ex.InnerException != null)
                {
                    response.Message += " Inner exception: " + ex.InnerException.Message;
                }

                return StatusCode(500, response); // Return 500 status code with error message
            }

            return Ok(response);
        }



    }
}
