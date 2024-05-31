using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassMate.Models
{
    public class QuizAttempt
    {
        [Key]
        public int QuizAttemptId { get; set; }

        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }

        [ForeignKey("Student")]
        public string? StudentId { get; set; }
        public ApplicationUser Student { get; set; }

        public DateTime AttemptedOn { get; set; }
        public int Score { get; set; }
        public bool IsPassed { get; set; }

        // Include a collection to store selected options for each question attempted
        public virtual ICollection<QuestionAttempt> QuestionAttempts { get; set; }
    }

    // Model to store the selected option for each question attempted in a quiz attempt
    public class QuestionAttempt
    {
        [Key]
        public int QuestionAttemptId { get; set; }

        [ForeignKey("QuizAttempt")]
        public int QuizAttemptId { get; set; }
        public QuizAttempt QuizAttempt { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public string SelectedOption { get; set; }
    }
}