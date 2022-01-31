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
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        public EmployeesController(EmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpPost]
        [Route("Register")]
        public ActionResult Register(RegisterVM registerVM)
        {
            var register = employeeRepository.Register(registerVM);

            switch (register)
            {
                case 1 :
                    return Ok(new { status = HttpStatusCode.OK, register, message = "Register Success" });
                case -1:
                    return Ok(new { status = HttpStatusCode.BadRequest, register, message = "Error NIK Duplicate" });
                case -2:
                    return Ok(new { status = HttpStatusCode.BadRequest, register, message = "Error Phone Number Duplicate" });
                case -3:
                    return Ok(new { status = HttpStatusCode.BadRequest, register, message = "Error Email Duplicate" });
                default:
                return Ok(new { status = HttpStatusCode.BadRequest, register, message = "Unknown error" });
            }

            //if (register > 0)
            //{
            //    return Ok(new { status = HttpStatusCode.OK, register, message = "Register Success" });

            //}
            //else
            //{
            //    return Ok(new { status = HttpStatusCode.BadRequest, register, message = "Unknown error" });
            //}
        }

    }
}
