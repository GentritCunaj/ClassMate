using ClassMate.Dtos;
using ClassMate.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassMate.Controllers
{
    internal interface IResourceController
    {
        Task<ActionResult<ServiceResponse<IEnumerable<Resource>>>> GetResources();
        Task<ActionResult<ServiceResponse<Resource>>> GetResource(int id);
        Task<ActionResult<ServiceResponse<List<Resource>>>> PostResource(ResourceDto resourceDto);
        Task<ActionResult<ServiceResponse<Resource>>> DeleteResource(int id);
        Task<ActionResult<ServiceResponse<Resource>>> UpdateResource(int id, ResourceDto updatedResourceDto);

        Task<ActionResult<ServiceResponse<List<Report>>>> DeleteResources(int id);
    }
}