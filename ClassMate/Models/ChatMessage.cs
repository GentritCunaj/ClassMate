using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class ChatMessage
    {
        public int ChatMessageId { get; set; }

        [ForeignKey("Creator")]
        public string CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }

        [ForeignKey("StudyGroup")]
        public string StudyGroupId { get; set; }
        public StudyGroup StudyGroup { get; set; }

        public DateTime Timestamp { get; set; }

        public string Message { get; set; }
    }
}