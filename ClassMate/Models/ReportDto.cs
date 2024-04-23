using ClassMate.Models;
using System.ComponentModel.DataAnnotations;

namespace ClassMate.Dtos
{
    public class ReportDto
    {
        public int ReportId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string CreatorId { get; set; }
        public string? StudyGroupId { get; set; }
        public int? ResourceId { get; set; }
        public int? AssignmentId { get; set; }
        public int? QuizId { get; set; }

        public string? UserId { get; set; }
        public int? ChatMessageId { get; set; }
    }
}
