using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    [Authorize]
    public class MenuController : Controller
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
        public IActionResult ApprovePinjaman()
        {
            return View();
        }
        public IActionResult Tagihanku()
        {
            return View();
        }
        public IActionResult ApproveTagihan()
        {
            return View();
        }
    }
}
