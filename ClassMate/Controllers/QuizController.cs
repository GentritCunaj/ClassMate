﻿    
using Azure;
using ClassMate.Data;
using ClassMate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Diagnostics.Metrics;
using System.Security.Claims;
using static ClassMate.Models.StudyGroup;


namespace ClassMate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuizController : ControllerBase, IQuizController
    {
        private readonly DataContext _db;

        public QuizController(DataContext db)
        {
            _db = db;
        }

        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<Quiz>>>> PostQuiz(QuizDto quizDto)
        {
            var response = new ServiceResponse<List<Quiz>>();

            try
            {
                // Assuming CreatorId is set in the quizDto
                var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == quizDto.CreatorId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var quiz = new Quiz
                {
                    Title = quizDto.Title,
                    Thumbnail = quizDto.Thumbnail,
                    Subject = quizDto.Subject,
                    CreatorId = quizDto.CreatorId,
                    NoOfQuestions = quizDto.NoOfQuestions,
                    PointPerQuestion = quizDto.PointPerQuestion,
                    NegativeMarking = quizDto.NegativeMarking,
                    NegativeMarkingPerQuestion = quizDto.NegativeMarkingPerQuestion,
                    TotalTimeInMinutes = quizDto.TotalTimeInMinutes,
                    // Assuming you have a mapping between QuizDto and Quiz entities
                    // and the Questions property is properly populated
                    Questions = quizDto.Questions.Select(q => new Question
                    {
                        Text = q.Text,
                        Options = q.Options,
                        CorrectAnswer = q.CorrectAnswer
                    }).ToList()
                };

                _db.Quizzes.Add(quiz);
                await _db.SaveChangesAsync();

                response.Data = await _db.Quizzes.ToListAsync();
                response.Success = true;
                response.Message = "Quiz created successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

            return Ok(response);
        }
        // GET: Quiz

        [Authorize(Roles = "Student,Teacher")]

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<IEnumerable<Quiz>>>> GetQuizzes()
        {
            var response = new ServiceResponse<IEnumerable<Quiz>>();

            try
            {
                var quizzes = await _db.Quizzes
                    .Include(q => q.Questions) // Include questions related to each quiz
                    .ToListAsync();

                response.Data = quizzes;
                response.Success = true;
                response.Message = "Quizzes retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

            return Ok(response);
        }


        [Authorize(Roles = "Student,Teacher")]

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Quiz>>> GetQuiz(int id)
        {
            var response = new ServiceResponse<Quiz>();

            try
            {
                var quiz = await _db.Quizzes
                    .Include(q => q.Questions) // Include questions related to the quiz
                    .FirstOrDefaultAsync(q => q.QuizID == id);

                if (quiz == null)
                {
                    return NotFound();
                }

                response.Data = quiz;
                response.Success = true;
                response.Message = "Quiz retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

            return Ok(response);
        }

        [Authorize(Roles = "Teacher")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> DeleteQuiz(int id)
        {
            var response = new ServiceResponse<string>();

            try
            {
                var quiz = await _db.Quizzes.FirstOrDefaultAsync(q => q.QuizID == id);

                if (quiz == null)
                {
                    return NotFound("Quiz not found");
                }

                _db.Quizzes.Remove(quiz);
                await _db.SaveChangesAsync();

                response.Success = true;
                response.Message = "Quiz deleted successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

            return Ok(response);
        }
    }
}