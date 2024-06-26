﻿using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface ISubmissionController
    {
        Task<ActionResult<ServiceResponse<Submission>>> SubmitSubmission(IFormFile submittedFile, int assignmentId);
        Task<ActionResult<ServiceResponse<List<SubmissionDto>>>> GetSubmissions(int assignmentId);
        Task<IActionResult> DownloadSubmission(int submissionId);
        }
}
