using API_project.Context;
using API_project.Models;
using API_project.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class PengembalianRepository : GeneralRepository<MyContext, Pengembalian, string>
    {
        private readonly MyContext myContext;
        public PengembalianRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public int InsertReturnLoan(FormReturnVM formReturnVM)
        {
            int response;
            var request = myContext.RequestPeminjaman.Where(rp => rp.ID == formReturnVM.RequestID).FirstOrDefault();
            myContext.Entry(request).State = EntityState.Detached;
            var requestLoan = new RequestPeminjaman
            {
                ID = request.ID,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Keperluan = request.Keperluan,
                Approval = 0,
                Loan = 2,
                AccountID = request.AccountID
            };
            myContext.Entry(requestLoan).State = EntityState.Modified;
            response = myContext.SaveChanges();

            foreach (var item in formReturnVM.ItemReturn)
            {
                if (item["Cost"] != null)
                {
                    var formattedReturn = new Pengembalian
                    {
                        ID = item["ID"].ToString(),
                        TanggalKembali = Convert.ToDateTime(item["ReturnDate"]),
                        DeskripsiKondisi = item["Description"].ToString(),
                        KondisiBarang = bool.Parse(item["Kondisi"].ToString()),
                    };
                    myContext.Pengembalians.Add(formattedReturn);
                    myContext.SaveChanges();

                    int increment = myContext.Tagihans.ToList().Count;
                    string formattedIdRequest = "";
                    if (increment == 0)
                    {
                        formattedIdRequest = "BILL" + "0" + increment.ToString();
                    }
                    else
                    {
                        string incrementId = myContext.RequestPeminjaman.ToList().Max(e => e.ID);
                        string[] explode = incrementId.Split("Q");
                        int formulaId = Int32.Parse(explode[1]) + 1;
                        formattedIdRequest = "BILL" + "0" + formulaId.ToString();
                    }

                    var formattedTagihan = new Tagihan
                    {
                        ID = formattedIdRequest,
                        PengembalianID = item["ID"].ToString(),
                        TotalBayar = int.Parse(item["Cost"].ToString()),
                        UploadDate = DateTime.Now,
                    };
                    myContext.Tagihans.Add(formattedTagihan);
                    response = myContext.SaveChanges();
                }
                else { 
                    var formattedReturn = new Pengembalian
                    {
                        ID = item["ID"].ToString(),
                        TanggalKembali = Convert.ToDateTime(item["ReturnDate"]),
                        DeskripsiKondisi = item["Description"].ToString(),
                        KondisiBarang = bool.Parse(item["Kondisi"].ToString()),
                    };
                    myContext.Pengembalians.Add(formattedReturn);
                    response = myContext.SaveChanges();
                }
            }

            return response;
        }
    }
}
