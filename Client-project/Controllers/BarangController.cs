using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Client_project.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    [Authorize]
    public class BarangController : BaseController<Barang, BarangRepository, string>
    {
        private readonly BarangRepository barangRepository;
        public BarangController(BarangRepository repository) : base(repository)
        {
            this.barangRepository = repository;
        }

        [HttpGet]
        public async Task<JsonResult> GetAllBarang()
        {
            var result = await barangRepository.GetAllBarang();
            return Json(result);
        }

        [HttpPut("Barang/Updatebarang")]
        public JsonResult UpdateBarang(FormBarangVM barang)
        {
            var result = barangRepository.UpdateBarang(barang);
            return Json(result);
        }

        [HttpPost("Barang/Insertbarang")]
        public JsonResult InsertBarang(FormBarangVM formBarangVM)
        {
            var result = barangRepository.InsertBarang(formBarangVM);
            return Json(result);
        }

        [HttpDelete("Barang/DeleteBarang/{id}")]
        public JsonResult DeleteBarang(string id)
        {
            var result = barangRepository.DeleteBarang(id);
            return Json(result);
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
