using System.ComponentModel.DataAnnotations;

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
    }
}
