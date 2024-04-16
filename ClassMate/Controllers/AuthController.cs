

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

namespace ClassMate.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase, IAuthController
    {
        private readonly DataContext _db;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _authentication;
        private readonly IHttpContextAccessor _context;

        public AuthController(DataContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
            IAuthentication authentication, IHttpContextAccessor context, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _signInManager = signInManager;
            _userManager = userManager;
            _authentication = authentication;
            _context = context;
            _roleManager = roleManager;
        }



        [HttpGet("allUsers")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> GetUsersWithRoles(string roleName)
        {
            var response = new ServiceResponse<IEnumerable<ApplicationUser>>();

            // Check if the role exists
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                response.Success = false;
                response.Message = $"Role '{roleName}' not found.";
                return BadRequest(response);
            }

            // Get users who have the specified role
            var usersWithRole = await _userManager.GetUsersInRoleAsync(roleName);

            response.Data = usersWithRole;
            response.Success = true;
            response.Message = roleName;
            return Ok(response);
        }


        [HttpPost("loginUser")]
        public async Task<ActionResult<ServiceResponse<string>>>Login(Login login)
        {

            var response = new ServiceResponse<string>();
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null)
            {
                response.Data = null;
                response.Success = false;
                response.Message = "No user found";
            }
            else
            {


                var result = await _signInManager.PasswordSignInAsync(user, login.Password, false, false);
                if (result.Succeeded)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var jwtSecurityToken = _authentication.GenerateJwtToken(user, userRoles[0]);

                    _context.HttpContext.Session.SetString("user", user.NormalizedEmail);

                    _context.HttpContext.Session.SetString("Token", jwtSecurityToken);
                    
                    response.Data = jwtSecurityToken;
                    response.Message = userRoles[0].ToUpper() + " Logged in";
                    response.Success = true;
                    

                }
                else
                {
                    response.Data = null;
                    response.Message = "Not Logged in";
                    response.Success = false;
                }
            }
            return response;

        }

        [HttpPost("changepassword")]
       
        public async Task<ActionResult<ServiceResponse<string>>> ChangePassword(ChangePasswordDto model)
        {
            var response = new ServiceResponse<string>();
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                response.Data = null;
                response.Message = "Doesnt exist";
                response.Success = false;
                return response;
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                response.Data = null;
                response.Message = "Something went wrong";
                response.Success = false;
                return response;
            }
            else
            {
                response.Data = null;
                response.Message = "Password updated";
                response.Success = true;
                return response;
            }

           
        }

        [HttpPut("info")]
        public async Task<ActionResult<ServiceResponse<ApplicationUser>>> UpdateInfo(Register userdto)
        {
            var response = new ServiceResponse<ApplicationUser>();
            var nameIdentifier = _context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(nameIdentifier);
            if (user != null)
            {
                user.FirstName = userdto.FirstName;
                user.LastName = userdto.LastName;
                user.PhoneNumber = userdto.PhoneNumber;
                user.UserName = userdto.UserName;
                user.Address = userdto.Address;
                user.Email = userdto.Email;
                user.UserName = userdto.UserName;
                user.Birthday = userdto.Birthday;
                user.City = userdto.City;
                user.Country = userdto.Country;
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                 
                    response.Data = await _userManager.FindByIdAsync(nameIdentifier);
                    response.Success = true;
                    response.Message = "User updated";
                }
                else
                {
                    response.Data = user;
                    response.Success = false;
                    response.Message = "Something went wrong";
                }


            }
            else
            {
                response.Data = null;
                response.Success = false;
                response.Message = "No user found";

            }
            return response;

        }

        [Authorize(Roles = "Admin,Teacher,Student")]
        [HttpGet("info")]
        public async Task<ActionResult<ServiceResponse<ApplicationUser>>> GetInfo()
        {
            var response = new ServiceResponse<ApplicationUser>();
            var nameIdentifier = _context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _db.Users.Where(u => u.Id == nameIdentifier).FirstOrDefaultAsync();
            user.FRole = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            if (user == null)
            {
                response.Data = null;
                response.Message = "No user found";
                response.Success = false;
            }
            else
            {
                response.Data = user;
                response.Message = "User found";
                response.Success = true;
            }
            return response;

        }


        [HttpPost("registerUser")]
        public async Task<ActionResult<ServiceResponse<string>>> Register(Register register)
        {
            var response = new ServiceResponse<string>();
            var checking = await _userManager.FindByEmailAsync(register.Email);

            if (checking != null)
            {
                response.Data = null;
                response.Success = false;
                response.Message = "You're already registered";
                return response;
            }

            var user = new ApplicationUser
            {
              
                Email = register.Email,
                UserName = register.UserName,
                PhoneNumber = register.PhoneNumber,
                FirstName = register.FirstName,
                LastName = register.LastName,
                City = register.City,
                Country = register.Country,
                Birthday = register.Birthday,
                Address = register.Address,


            };



            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    if (error.Code == "DuplicateUserName")
                    {
                        response.Data = null;
                        response.Success = false;
                        response.Message = "Username is already chosen";
                        return response;
                    }
                    if (error.Code == "PasswordRequiresNonAlphanumeric" || error.Code == "PasswordRequiresDigit" || error.Code == "PasswordRequiresUpper")
                    {
                        response.Data = null;
                        response.Success = false;
                        response.Message = "Password is not strong enough";
                        return response;
                    }
                    
                }
            }

            if (result.Succeeded)
            {
               
                var addToRoleResult = await _userManager.AddToRoleAsync(user,register.Role );

                if (addToRoleResult.Succeeded)
                {
                    response.Data = null;
                    response.Success = true;
                    response.Message = "You're registered";
                }
                else
                {
                    // If adding the role fails, delete the user and return an error response
                    await _userManager.DeleteAsync(user);
                    response.Data = null;
                    response.Success = false;
                    response.Message = "Failed to add role to the user";
                }
            }
            else
            {
                response.Data = null;
                response.Success = false;
                response.Message = "Failed to create user";
            }

            return response;
        }

    }
}
