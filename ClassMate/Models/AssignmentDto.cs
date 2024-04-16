using System.ComponentModel.DataAnnotations;

namespace ClassMate.Models
{
    public class AssignmentDto
    {
        public int AssignmentId {get; set;}
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public string TeacherId { get; set; }
    }
}
