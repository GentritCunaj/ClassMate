using System.ComponentModel.DataAnnotations;

namespace ClassMate.Models
{
    public class StudyGroup
    {
        public enum VisibilityEnum
        {
            Private,
            Public,
        }
        public enum TypeEnum
        {
            Video,  // Video study group
            Message // Message study group
        }

        public string StudyGroupId { get; set; }
        public string GroupName { get; set; }
        public string? Description { get; set; }
        public string CreatorId { get; set; }
        public ApplicationUser Creator { get; set; }

        public VisibilityEnum Visibility { get; set; }
        public TypeEnum Type { get; set; } // Add the Type attribute

        // Navigation properties
        public int? Reports { get; set; } = 0;
        public ICollection<ChatMessage>? ChatMessages { get; set; } // Navigation property to store chat messages
    }

}
