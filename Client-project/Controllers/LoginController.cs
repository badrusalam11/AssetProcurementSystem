using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Client_project.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    public class LoginController : BaseController<Account, LoginRepository, int>
    {
        private readonly LoginRepository loginRepository;
        public LoginController(LoginRepository repository) : base(repository)
        {
            this.loginRepository = repository;
        }
        public IActionResult Index()
        {
            var token = HttpContext.Session.GetString("JWToken");

            if (token == null)
            {
                return View();
            }

            return RedirectToAction("index", "Menu");

            //return View();
        }

        [HttpPost]
        public async Task<IActionResult> Auth(LoginVM login)
        {
            var jwtToken = await loginRepository.Auth(login);
            var token = jwtToken.Token;

            if (token == null)
            {
                return RedirectToAction("index");
            }

            var handler = new JwtSecurityTokenHandler();
            var decodedValue = handler.ReadJwtToken(token);
            var EmployeeID = decodedValue.Claims.First(c => c.Type == "EmployeeID").Value;
            var Name = decodedValue.Claims.First(c => c.Type == "Name").Value;

            HttpContext.Session.SetString("JWToken", token);
            HttpContext.Session.SetString("EmployeeID", EmployeeID);
            HttpContext.Session.SetString("Name", Name);
            //HttpContext.Session.SetString("Name", jwtHandler.GetName(token));
            //HttpContext.Session.SetString("ProfilePicture", "assets/img/theme/user.png");

            return RedirectToAction("index", "Menu");
        }

        //[Authorize]
        //[HttpGet]
        //public IActionResult Logout()
        //{
        //    HttpContext.Session.Clear();
        //    return RedirectToAction("index");
        //}
    }
}
