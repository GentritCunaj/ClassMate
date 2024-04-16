﻿using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IQuizController
    {
        Task<ActionResult<ServiceResponse<List<Quiz>>>>PostQuiz(QuizDto quizDto);
        Task<ActionResult<ServiceResponse<IEnumerable<Quiz>>>> GetQuizzes();
        Task<ActionResult<ServiceResponse<Quiz>>> GetQuiz(int id);
    }
}