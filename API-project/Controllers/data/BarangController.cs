using API_project.Models;
using API_project.Repository.data;
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
    public class BarangController : BaseController<Barang, BarangRepository, string>
    {
        private readonly BarangRepository barangRepository;
        public BarangController(BarangRepository barangRepository) : base(barangRepository)
        {
            this.barangRepository = barangRepository;
        }


        [HttpGet]
        [Route("GetAllBarang")]
        public ActionResult<Object> GetAllBarang()
        {
            var result = barangRepository.GetAllBarang();
            if (result != null)
            {
                return Ok(result);
            }
            return Ok(new { status = HttpStatusCode.NotFound, message = "Error data not found" });

        }

        [HttpPost]
        [Route("InsertBarang")]
        public ActionResult InsertBarang(Barang barang)
        {
            var response = barangRepository.InsertBarang(barang);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Input Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Memasukkan Data" });
        }


        [HttpDelete]
        [Route("DeleteBarang/{id}")]
        public ActionResult DeleteBarang(string id)
        {
            var response = barangRepository.DeleteBarang(id);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Delete Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Delete Data" });
        }

    }
}
