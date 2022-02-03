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
    public class PengembalianController : BaseController<Pengembalian, PengembalianRepository, string>
    {
        private readonly PengembalianRepository pengembalianRepository;
        public PengembalianController(PengembalianRepository pengembalianRepository) : base(pengembalianRepository)
        {
            this.pengembalianRepository = pengembalianRepository;
        }

        [HttpPost]
        [Route("Loan/InsertReturn")]
        public ActionResult InsertRequestPeminjaman(FormReturnVM formReturnVM)
        {
            var response = pengembalianRepository.InsertReturnLoan(formReturnVM);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Input Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Memasukkan Data" });
        }
    }
}
