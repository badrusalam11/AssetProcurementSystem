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
    public class RequestPeminjamanController : BaseController<RequestPeminjaman, RequestPeminjamanRepository, string>
    {
        private readonly RequestPeminjamanRepository peminjamanRepository;
        public RequestPeminjamanController(RequestPeminjamanRepository peminjamanRepository) : base(peminjamanRepository)
        {
            this.peminjamanRepository = peminjamanRepository;
        }
    }
}
