using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Client_project.Repository.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    public class RequestPeminjamanController : BaseController<RequestPeminjaman, RequestPeminjamanRepository, string>
    {

        private readonly RequestPeminjamanRepository requestPeminjamanRepository;
        public RequestPeminjamanController(RequestPeminjamanRepository repository) : base(repository)
        {
            this.requestPeminjamanRepository = repository;
        }

        [HttpPost("RequestPeminjaman/InsertRequestPeminjaman")]
        public JsonResult InsertRequestPeminjaman(FormRequestPeminjamanVM formRequestPeminjamanVM)
        {
            var result = requestPeminjamanRepository.InsertRequestPeminjaman(formRequestPeminjamanVM);
            return Json(result);
        }

    }
}
