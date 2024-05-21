using System.Collections.Generic;

namespace ClassMate.Models
{
    public class QuizDto
    {
        public int QuizID { get; set; }
        public string Title { get; set; }
        public string Thumbnail { get; set; }
        public int SubjectId { get; set; }
        public string CreatorId { get; set; }
        public int NoOfQuestions { get; set; }
        public int PointPerQuestion { get; set; }
        public string NegativeMarking { get; set; }
        public string NegativeMarkingPerQuestion { get; set; }
        public int TotalTimeInMinutes { get; set; }
        public List<QuestionDto> Questions { get; set; }
    }

    public class QuestionDto
    {
        public int QuestionID { get; set; }
        public string Text { get; set; }
        public List<string> Options { get; set; }
        public string CorrectAnswer { get; set; }
    }
}