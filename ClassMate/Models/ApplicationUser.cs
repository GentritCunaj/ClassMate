using Microsoft.AspNetCore.Identity;

namespace ClassMate.Models
{
    public class ApplicationUser:IdentityUser
    {
        public enum UserRoleEnum
        {
            Admin,
            Teacher,
            Student
        }
        public UserRoleEnum Role { get; set; }
    }
}
