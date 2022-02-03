using API_project.Context;
using API_project.Models;
using API_project.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class RequestPeminjamanRepository : GeneralRepository<MyContext, RequestPeminjaman, string>
    {
        private readonly MyContext myContext;
        public RequestPeminjamanRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public int InsertRequestPeminjaman(FormRequestPeminjamanVM formRequestPeminjamanVM)
        {
            int response;
            int increment = myContext.RequestPeminjaman.ToList().Count;
            string formattedIdRequest = "";
            if (increment == 0)
            {
                formattedIdRequest = "REQ" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.RequestPeminjaman.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("Q");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedIdRequest = "REQ" + "0" + formulaId.ToString();
            }

            var formattedRequest = new RequestPeminjaman
            {
                ID = formattedIdRequest,
                StartDate = formRequestPeminjamanVM.StartDate,
                EndDate = formRequestPeminjamanVM.EndDate,
                Approval = 2,
                Keperluan = formRequestPeminjamanVM.Keperluan,
                AccountID = formRequestPeminjamanVM.AccountID
            };
            myContext.RequestPeminjaman.Add(formattedRequest);
            response = myContext.SaveChanges();


            foreach (var item in formRequestPeminjamanVM.BarangID)
            {

            increment = myContext.Peminjaman.ToList().Count;
            var formattedIdLoan = "";
            if (increment == 0)
            {
                formattedIdLoan = "PEM" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.Peminjaman.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("M");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedIdLoan = "PEM" + "0" + formulaId.ToString();
            }

            var formattedPeminjaman = new Peminjaman
            {
                ID = formattedIdLoan,
                KondisiBarang = true,
                DeskripsiKondisi = null,
                RequestPeminjamanID = formattedIdRequest,
                BarangID = item
            };
                myContext.Peminjaman.Add(formattedPeminjaman);
                response = myContext.SaveChanges();
            }

            return response;
        }

    }
}
