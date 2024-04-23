namespace ClassMate.Models
{
    public class Report
    {
        public int ReportId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }

        public string? StudyGroupId { get; set; }
        public StudyGroup StudyGroup { get; set; }

        
        public int? ResourceId { get; set; }
        public Resource Resource { get; set; }

        
        public int? AssignmentId { get; set; }
        public Assignment Assignment { get; set; }

        
        public int? QuizId { get; set; }
        public Quiz Quiz { get; set; }

        public string? UserId { get; set; }
        public ApplicationUser User { get; set; }

        
        public int? ChatMessageId { get; set; }
        public ChatMessage ChatMessage { get; set; }
    }
}
