using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Barang()
        {
            return View();
        }
        public IActionResult Pinjaman()
        {
            return View();
        }
        public IActionResult Tagihan()
        {
            return View();
        }

    }
}
