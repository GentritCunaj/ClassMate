

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

   

        [HttpPost("loginUser")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(Login login)
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
