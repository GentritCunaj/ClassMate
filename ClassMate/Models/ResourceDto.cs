using System.ComponentModel.DataAnnotations;

namespace ClassMate.Dtos
{
    public class ResourceDto
    {
        public int ResourceId { get; set; }
        public string? StudyGroupId { get; set; }
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? FileUrl { get; set; }

        [Required(ErrorMessage = "File is required")]
        public IFormFile FileInput { get; set; }
    }
}
