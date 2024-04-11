using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IQuizController
    {
        Task<ActionResult<ServiceResponse<QuizDto>>> PostQuiz(QuizDto quizDto);
    }
}