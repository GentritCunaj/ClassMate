namespace ClassMate.Models
{
    public class ChatMessage
    {
        public int ChatMessageId { get; set; }
        public string CreatorId { get; set; }

        public string StudyGroupId { get; set; }
        public DateTime Timestamp { get; set; }

        public string Message { get; set; }

        public ApplicationUser Creator { get; set; }
        public StudyGroup StudyGroup { get; set; }

    }
}