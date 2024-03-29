using System.ComponentModel.DataAnnotations;

namespace ClassMate.Models
{
    public class StudyGroupDto
    {
        

        public string StudyGroupId { get; set; }
        public string GroupName { get; set; }
        public string? Description { get; set; }
        public string CreatorId { get; set; }
        public StudyGroup.VisibilityEnum Visibility { get; set; }
        public StudyGroup.TypeEnum Type { get; set; } // Add the Type attribute

        // Navigation properties
        public int? Reports { get; set; } = 0;
       
    }

}
