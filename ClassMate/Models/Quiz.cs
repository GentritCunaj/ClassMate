using ClassMate.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Quiz
{
    [Key]
    public int QuizID { get; set; }

    public string Title { get; set; }

    public string Thumbnail { get; set; } = "https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png";


    public string Subject { get; set; }

    
    public string CreatorId { get; set; }

    
    public ApplicationUser Creator { get; set; }

    public int NoOfQuestions { get; set; }

    public int PointPerQuestion { get; set; }

    public string NegativeMarking { get; set; } = "No";

    public string NegativeMarkingPerQuestion { get; set; } = "No";

    public int TotalTimeInMinutes { get; set; }

    public virtual ICollection<Question> Questions { get; set; }
}

public class Question
{
    [Key]
    public int QuestionID { get; set; }

    [ForeignKey("Quiz")]
    public int QuizID { get; set; }

    public string Text { get; set; }

    
    public List<string> Options { get; set; }

    public string CorrectAnswer { get; set; }

    public virtual Quiz Quiz { get; set; }
}