
using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    public interface IAuthController
    {
 
        Task<ActionResult<ServiceResponse<string>>> Login([FromBody] Login login);
        Task<ActionResult<ServiceResponse<string>>> Register(Register register);
    
    }
}