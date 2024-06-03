using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class Assignment{
        [Key]
        public int AssignmentId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string TeacherId { get; set; }
        public ApplicationUser Teacher { get; set; }

        public int? SubjectId { get; set; }
        public virtual Subject Subject { get; set; }

    }
    
    }