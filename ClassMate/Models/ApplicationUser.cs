using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class ApplicationUser:IdentityUser
    {
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? FirstName { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? LastName { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? City { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? Country { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? Address { get; set; }

        [PersonalData]
        public DateTime? Birthday { get; set; }

        [NotMapped]
        public string? FRole { get; set; }
    }
}
