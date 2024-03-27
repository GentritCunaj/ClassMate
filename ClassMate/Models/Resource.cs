using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class Resource
    {
        public int ResourceId { get; set; }
        public string? StudyGroupId { get; set; } // Foreign Key
        public string UserId {  get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileUrl { get; set; }
        public ApplicationUser User { get; set; }
        public StudyGroup StudyGroup { get; set; }

        [NotMapped]
        public IFormFile FileInput { get; set; } // For ASP.NET Core

    }
}
