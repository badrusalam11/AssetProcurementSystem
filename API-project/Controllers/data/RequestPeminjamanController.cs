using API_project.Models;
using API_project.Repository.data;
using API_project.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API_project.Controllers.data
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestPeminjamanController : BaseController<RequestPeminjaman, RequestPeminjamanRepository, string>
    {
        private readonly RequestPeminjamanRepository requestPeminjamanRepository;
        public RequestPeminjamanController(RequestPeminjamanRepository requestPeminjamanRepository) : base(requestPeminjamanRepository)
        {
            this.requestPeminjamanRepository = requestPeminjamanRepository;
        }

        [HttpPost]
        [Route("InsertRequestPeminjaman")]
        public ActionResult InsertRequestPeminjaman(FormRequestPeminjamanVM formRequestPeminjamanVM)
        {
            var response = requestPeminjamanRepository.InsertRequestPeminjaman(formRequestPeminjamanVM);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Input Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Memasukkan Data" });
        }
    }
   

}
