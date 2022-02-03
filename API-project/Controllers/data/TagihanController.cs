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
    public class TagihanController : BaseController<Tagihan, TagihanRepository, string>
    {
        private readonly TagihanRepository tagihanRepository;
        public TagihanController(TagihanRepository tagihanRepository) : base(tagihanRepository)
        {
            this.tagihanRepository = tagihanRepository;
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
        [Route("RejectTagihan/{id}")]
        public ActionResult RejectTagihan(string id)
        {
            var response = tagihanRepository.RejectTagihan(id);
            if (response == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, response, message = "Berhasil Delete Data" });
            }
            return BadRequest(new { status = HttpStatusCode.BadRequest, response, message = "Gagal Delete Data" });
        }


    }

}
