using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IAssignmentController
    {


        Task<ActionResult<ServiceResponse<List<Assignment>>>> PostAssignment(AssignmentDto assignmentDto);
        Task<ActionResult<ServiceResponse<List<Assignment>>>> GetAllAssignments();
        Task<ActionResult<ServiceResponse<Assignment>>> GetAssignmentById(int id);
        Task<ActionResult<ServiceResponse<Assignment>>> UpdateAssignment(int id, AssignmentDto updatedAssignmentDto);
        Task<ActionResult<ServiceResponse<string>>> DeleteAssignment(int id);
    }
}

