namespace ClassMate.Models
{
    public class QuizAttemptDto
    {
        public int QuizId { get; set; }
        public string? StudentId { get; set; }

        public DateTime AttemptedOn { get; set; }
        public int Score { get; set; }
        public bool IsPassed { get; set; }

        public List<QuestionAttemptDto> QuestionAttempts { get; set; }
    }

    public class QuestionAttemptDto {
        public int QuizAttemptId { get; set; }
        public int QuestionId { get; set; }
        public string SelectedOption { get; set; }

    }

}
