using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IRoomController
    {
        Task<ActionResult<ServiceResponse<List<StudyGroup>>>> PostStudyGroup(StudyGroupDto studyGroupDto);
        Task<ActionResult<ServiceResponse<StudyGroup>>> ReportStudyGroup(string studyGroupId);
        Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetPublicStudyGroups();
        Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetStudyGroupsWithMultipleReports();
        Task<ActionResult<ServiceResponse<StudyGroup>>> DeleteStudyGroup(string studyGroupId);

        Task<ActionResult<ServiceResponse<string>>> AddStudentToStudyGroup(UserStudy userStudy);

        Task<ActionResult<ServiceResponse<IEnumerable<StudyGroup>>>> GetPrivateStudyGroups();


    }
}