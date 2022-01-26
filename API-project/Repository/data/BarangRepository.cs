﻿using API_project.Context;
using API_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class BarangRepository : GeneralRepository<MyContext, Barang, string>
    {
        public BarangRepository(MyContext myContext) : base(myContext)
        {
        }
    }
}
