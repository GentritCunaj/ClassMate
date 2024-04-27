using ClassMate.Dtos;
using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IReportController
    {
        Task<ActionResult<ServiceResponse<IEnumerable<Report>>>> GetReports();
        Task<ActionResult<ServiceResponse<Report>>> GetReport(int id);
        Task<ActionResult<ServiceResponse<List<Report>>>> PostReport(ReportDto reportDto);
        Task<ActionResult<ServiceResponse<List<Report>>>> DeleteReports(string type, string id);
        Task<ActionResult<ServiceResponse<Report>>> DeleteReport(int id);
        Task<ActionResult<ServiceResponse<Report>>> UpdateReport(int id, ReportDto updatedReportDto);
    }
}