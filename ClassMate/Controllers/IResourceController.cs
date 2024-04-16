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
        Task<ActionResult<Resource>> PostResource(Resource resource);
        Task<ActionResult> DeleteResource(int id);

    }
}