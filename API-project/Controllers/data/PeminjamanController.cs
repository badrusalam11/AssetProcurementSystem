using API_project.Models;
using API_project.Repository.data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Controllers.data
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeminjamanController : BaseController<Peminjaman, PeminjamanRepository, string>
    {
        private readonly PeminjamanRepository peminjamanRepository;
        public PeminjamanController(PeminjamanRepository peminjamanRepository) : base(peminjamanRepository)
        {
            this.peminjamanRepository = peminjamanRepository;
        }

        [HttpGet("Loan/GetAll")]
        public ActionResult<Object> GetAllLoan()
        {
            var result = peminjamanRepository.GetLoan();
            return Ok(result);
        }

        [HttpGet("Loan/Active")]
        public ActionResult<Object> GetLoanActive()
        {
            var result = peminjamanRepository.GetLoanActive();
            return Ok(result);
        }

        [HttpGet("Loan/Request")]
        public ActionResult<Object> GetRequestLoan()
        {
            var result = peminjamanRepository.GetRequestLoan();
            return Ok(result);
        }

        [HttpGet("Loan/ReturnRequest")]
        public ActionResult<Object> GetReturnRequestLoan()
        {
            var result = peminjamanRepository.GetReturnRequestLoan();
            return Ok(result);
        }

        [HttpGet("Loan/History")]
        public ActionResult<Object> GetLoanHistory()
        {
            var result = peminjamanRepository.GetLoanHistory();
            return Ok(result);
        }
        
        [HttpGet("Loan/Active/{AccountID}")]
        public ActionResult<Object> GetLoanActiveEmployee(string AccountID)
        {
            var result = peminjamanRepository.GetLoanActiveEmployee(AccountID);
            return Ok(result);
        }
        
        [HttpGet("Loan/History/{AccountID}")]
        public ActionResult<Object> GetLoanHistoryEmployee(string AccountID)
        {
            var result = peminjamanRepository.GetLoanHistoryEmployee(AccountID);
            return Ok(result);
        }

        [HttpGet("Loan/Detail/{ID}")]
        public ActionResult<Object> GetLoanDetail(string ID)
        {
            var result = peminjamanRepository.GetLoanDetail(ID);
            return Ok(result);
        }
    }
}
