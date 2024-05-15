namespace ClassMate.Models
{
    public class Subject
    {
        public int SubjectId { get; set; }
        public string Name { get; set; }
       public string? Description { get; set; }

        public virtual ICollection<Quiz>? Quizes { get; set; }

        public virtual ICollection<Assignment>? Assignments { get; set; }
        public virtual ICollection<Resource>? Resources { get; set; }

    }
}

