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
    public class BarangController : BaseController<Barang, BarangRepository, string>
    {
        private readonly BarangRepository barangRepository;
        public BarangController(BarangRepository barangRepository) : base(barangRepository)
        {
            this.barangRepository = barangRepository;
        }
    }
}
