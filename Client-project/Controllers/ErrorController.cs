using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Views.Home
{
    public class ErrorController : Controller
    {
        public IActionResult notfound()
        {
            return View();
        }
        public IActionResult unauthorized()
        {
            return View();
        }
        public IActionResult forbidden()
        {
            return View();
        }
    }
}
