using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class Submission
    {
        [Key]
        public int SubmissionId { get; set; }
        
        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; }
        public Assignment Assignment { get; set; }

        [ForeignKey("Student")]
        public string StudentId { get; set; }
        public ApplicationUser Student { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        
        public byte[]? SubmittedFile { get; set; } // New property for uploaded file
        public bool IsSubmitted { get; set; } // New property to indicate submission
        public DateTime SubmittedOn { get; set; }
    }
}
