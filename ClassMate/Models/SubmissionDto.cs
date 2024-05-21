namespace ClassMate.Models
{
    public class SubmissionDto
    {
        public int AssignmentId { get; set; }
        public string StudentId { get; set; }
        public string FileName { get; set; }
        public bool IsSubmitted { get; set; }
        public byte[]? SubmittedFile { get; set; } 
    }

}
