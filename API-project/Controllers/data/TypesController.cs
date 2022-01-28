using API_project.Models;
using API_project.Repository.data;
using Microsoft.AspNetCore.Mvc;


namespace API_project.Controllers.data
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesController : BaseController<Type, TypeRepository, string>
    {
        private readonly TypeRepository typeRepository;
        public TypesController(TypeRepository typeRepository) : base(typeRepository)
        {
            this.typeRepository = typeRepository;
        }
    }
}
