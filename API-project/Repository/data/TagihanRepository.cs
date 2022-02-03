using API_project.Context;
using API_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class TagihanRepository : GeneralRepository<MyContext, Tagihan, string>
    {
        private readonly MyContext myContext;

        public TagihanRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;

        }
        public int ApproveTagihan(string id)
        {
            var user = new Tagihan { ID = id, IsConfirm = true };
            myContext.Tagihans.Attach(user).Property(x => x.IsConfirm).IsModified = true;
            var save = myContext.SaveChanges();
            return save;
        }
        public int RejectTagihan(string id)
        {
            var user = new Tagihan { ID = id, IsConfirm = false };
            myContext.Tagihans.Attach(user).Property(x => x.IsConfirm).IsModified = true;
            var save = myContext.SaveChanges();
            return save;
        }
    }
}
