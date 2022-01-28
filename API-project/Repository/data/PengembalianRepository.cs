using API_project.Context;
using API_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class PengembalianRepository : GeneralRepository<MyContext, Pengembalian, string>
    {
        public PengembalianRepository(MyContext myContext) : base(myContext)
        {
        }
    }
}
