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
    public class TagihanController : BaseController<Tagihan, TagihanRepository, string>
    {
        private readonly TagihanRepository tagihanRepository;
        public TagihanController(TagihanRepository tagihanRepository) : base(tagihanRepository)
        {
            this.tagihanRepository = tagihanRepository;
        }

        [HttpGet]
        [Route("GetTagihan/{id}")]
        public ActionResult<Object> GetTagihan(string id)
        {
            var result = tagihanRepository.GetTagihan(id);
            if (result != null)
            {
                //return Ok(new { status = HttpStatusCode.OK, result, message = "Data loaded" });
                return Ok(result);
            }
            return Ok(new { status = HttpStatusCode.NotFound, message = "Error data not found" });

        }

        [HttpPut]
        [Route("ApproveTagihan/{id}")]
        public ActionResult ApproveTagihan(string id)
        {
            var response = tagihanRepository.ApproveTagihan(id);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Delete Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Delete Data" });
        }

        [HttpPut]
        [Route("UpdateTagihan")]
        public ActionResult UpdateTagihan(TagihankuVM tagihankuVM)
        {
            var response = tagihanRepository.UpdateTagihan(tagihankuVM);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Data Berhasil di Ubah" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Mengubah Data" });
        }

    }

}
