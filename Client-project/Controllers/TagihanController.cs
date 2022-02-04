using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Client_project.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    public class TagihanController : BaseController<Tagihan, TagihanRepository, string>
    {
        private readonly TagihanRepository tagihanRepository;
        public TagihanController(TagihanRepository repository) : base(repository)
        {
            this.tagihanRepository = repository;
        }

        [HttpPut("Tagihan/UpdateTagihan")]
        public JsonResult UpdateTagihan(TagihankuVM Tagihan)
        {
            var result = tagihanRepository.UpdateTagihan(Tagihan);
            return Json(result);
        }


    }
}
