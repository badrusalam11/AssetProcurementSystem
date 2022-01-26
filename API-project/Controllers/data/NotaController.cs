using API_project.Models;
using API_project.Repository.data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Controllers.data
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotaController : BaseController<Nota, NotaRepository, string>
    {
        private readonly NotaRepository notaRepository;
        public NotaController(NotaRepository notaRepository) : base(notaRepository)
        {
            this.notaRepository = notaRepository;
        }
    }
}
