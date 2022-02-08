using API_project.Models;
using Client_project.Base;
using Client_project.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Client_project.Controllers
{
    [Authorize]
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {

        private readonly EmployeeRepository employeeRepository;
        public EmployeeController(EmployeeRepository repository) : base(repository)
        {
            this.employeeRepository = repository;
        }

        [HttpGet]
        public async Task <JsonResult> GetUserData()
        {
            var EmployeeID = HttpContext.Session.GetString("EmployeeID");
            var result = await employeeRepository.Get(EmployeeID);
            return Json(result);

        }
    }
}
