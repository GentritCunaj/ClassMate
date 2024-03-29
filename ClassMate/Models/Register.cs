using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class Register
    {
       
        public string Email { get; set; }

        public string UserName { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string Role {  get; set; }

       
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        
        public string? Address { get; set; }

        public string? PhoneNumber {  get; set; }
       
        public DateTime? Birthday { get; set; }
    }
}
