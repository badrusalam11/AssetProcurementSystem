﻿using API_project.Models;
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
    public class TagihanController : BaseController<Tagihan, TagihanRepository, string>
    {
        private readonly TagihanRepository tagihanRepository;
        public TagihanController(TagihanRepository tagihanRepository) : base(tagihanRepository)
        {
            this.tagihanRepository = tagihanRepository;
        }
    }
}
