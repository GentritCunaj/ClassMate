namespace ClassMate.Models
{
    public class UserStudyGroup
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public string StudyGroupId { get; set; }
        public StudyGroup StudyGroup { get; set; }
    }
}
