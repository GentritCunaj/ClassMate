    
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
        private readonly UserManager<ApplicationUser> _userManager;

        public QuizController(DataContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
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
                    SubjectId = quizDto.SubjectId,
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

        [Authorize(Roles = "Teacher")]
        [HttpPut("{quizId}")]
        public async Task<ActionResult<ServiceResponse<Quiz>>> UpdateQuiz(int quizId, QuizDto updatedQuizDto)
        {
            var response = new ServiceResponse<Quiz>();

            try
            {
                var quiz = await _db.Quizzes.Include(q => q.Questions)
                                             .FirstOrDefaultAsync(q => q.QuizID == quizId);

                if (quiz == null)
                {
                    return NotFound("Quiz not found");
                }

                // Update quiz properties
                quiz.Title = updatedQuizDto.Title;
                quiz.Thumbnail = updatedQuizDto.Thumbnail;
                quiz.SubjectId = updatedQuizDto.SubjectId;
                quiz.CreatorId = updatedQuizDto.CreatorId;
                quiz.NoOfQuestions = updatedQuizDto.NoOfQuestions;
                quiz.PointPerQuestion = updatedQuizDto.PointPerQuestion;
                quiz.NegativeMarking = updatedQuizDto.NegativeMarking;
                quiz.NegativeMarkingPerQuestion = updatedQuizDto.NegativeMarkingPerQuestion;
                quiz.TotalTimeInMinutes = updatedQuizDto.TotalTimeInMinutes;

                // Update quiz questions
                foreach (var updatedQuestion in updatedQuizDto.Questions)
                {
                    var existingQuestion = quiz.Questions.FirstOrDefault(q => q.QuestionID == updatedQuestion.QuestionID);
                    if (existingQuestion != null)
                    {
                        existingQuestion.Text = updatedQuestion.Text;
                        existingQuestion.Options = updatedQuestion.Options;
                        existingQuestion.CorrectAnswer = updatedQuestion.CorrectAnswer;
                    }
                    else
                    {
                        // If the question doesn't exist, add it
                        quiz.Questions.Add(new Question
                        {
                            Text = updatedQuestion.Text,
                            Options = updatedQuestion.Options,
                            CorrectAnswer = updatedQuestion.CorrectAnswer
                        });
                    }
                }

                await _db.SaveChangesAsync();

                response.Success = true;
                response.Message = "Quiz updated successfully";
                response.Data = quiz;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message; // Handle exceptions appropriately
            }

            return Ok(response);
        }
        [Authorize(Roles = "Student")]
        [HttpGet("subjects/{subjectId}")]
        public async Task<ActionResult<ServiceResponse<List<Quiz>>>> GetQuizzesBySubject(int subjectId)
        {
            var response = new ServiceResponse<List<Quiz>>();

            try
            {
                // Retrieve quizzes for the specified subject from the database asynchronously
                var quizzes = await _db.Quizzes
                    .Where(q => q.SubjectId == subjectId)
                    .ToListAsync();

                // Set the retrieved quizzes to the response data
                response.Data = quizzes;

                // Set response properties indicating success
                response.Success = true;
                response.Message = "Quizzes Retrieved Successfully";
            }
            catch (Exception ex)
            {
                // If an exception occurs during database interaction, handle it here
                response.Success = false;
                response.Message = ex.Message; // Provide the exception message in the response
            }

            // Return an HTTP response with the service response object (serialized to JSON)
            return Ok(response);
        }
          [HttpPost("attempt")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<ServiceResponse<QuizAttemptDto>>> SubmitQuizAttempt(QuizAttemptDto quizAttemptDto)
        {
            var response = new ServiceResponse<QuizAttemptDto>();

            try
            {
                // Retrieve the user from the HttpContext
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not authorized.";
                    return Unauthorized(response);
                }

                // Retrieve the quiz from the database
                var quiz = await _db.Quizzes
                                    .Include(q => q.Questions)
                                    .FirstOrDefaultAsync(q => q.QuizID == quizAttemptDto.QuizId);

                if (quiz == null)
                {
                    return NotFound("Quiz not found");
                }

                // Validate the quiz attempt
                int score = 0;
                foreach (var questionAttempt in quizAttemptDto.QuestionAttempts)
                {
                    var question = quiz.Questions.FirstOrDefault(q => q.QuestionID == questionAttempt.QuestionId);
                    if (question == null)
                    {
                        return BadRequest($"Question with ID {questionAttempt.QuestionId} not found in the quiz");
                    }

                    if (question.CorrectAnswer == questionAttempt.SelectedOption)
                    {
                        score += quiz.PointPerQuestion;
                    }
                }

                // Determine if the student has passed the quiz
                bool isPassed = score >= (quiz.NoOfQuestions * quiz.PointPerQuestion) / 2;

                // Create a new QuizAttempt object
                var quizAttempt = new QuizAttempt
                {
                    QuizId = quizAttemptDto.QuizId,
                    StudentId = user.Id,
                    AttemptedOn = DateTime.UtcNow,
                    Score = score,
                    IsPassed = isPassed,
                    QuestionAttempts = quizAttemptDto.QuestionAttempts.Select(qa => new QuestionAttempt
                    {
                        QuestionId = qa.QuestionId,
                        SelectedOption = qa.SelectedOption
                    }).ToList()
                };

                _db.QuizAttempts.Add(quizAttempt);
                await _db.SaveChangesAsync();

                response.Data = quizAttemptDto;
                response.Success = true;
                response.Message = "Quiz attempt submitted successfully";
            }
            catch (DbUpdateException dbEx)
            {
                Console.Error.WriteLine($"DB Update Error: {dbEx.Message}");
                if (dbEx.InnerException != null)
                {
                    Console.Error.WriteLine($"Inner Exception: {dbEx.InnerException.Message}");
                }

                response.Success = false;
                response.Message = "A database error occurred while submitting the quiz attempt.";
                return StatusCode(500, response);
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.Error.WriteLine($"Error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.Error.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }

                response.Success = false;
                response.Message = "An error occurred while submitting the quiz attempt. Please try again later.";
                return StatusCode(500, response); // Return a 500 status code for internal server errors
            }

            return Ok(response);
        }



    }
}

