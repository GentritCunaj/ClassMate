using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IAssignmentController
    {

        Task<ActionResult<ServiceResponse<AssignmentDto>>> PostAssignment(AssignmentDto assignmentDto);
    }}