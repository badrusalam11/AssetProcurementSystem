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
    public class TagihanRepository : GeneralRepository<MyContext, Tagihan, string>
    {
        private readonly MyContext myContext;

        public TagihanRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;

        }

        public IEnumerable<Object> GetTagihan(string id)
        {
            var query = from account in myContext.Accounts
                            join requstPeminjaman in myContext.RequestPeminjaman
                               on account.ID equals requstPeminjaman.AccountID
                            join peminjaman in myContext.Peminjaman
                                on requstPeminjaman.ID equals peminjaman.RequestPeminjamanID
                            join pengembalian in myContext.Pengembalians
                                on peminjaman.ID equals pengembalian.ID
                            join tagihan in myContext.Tagihans
                                on pengembalian.ID equals tagihan.PengembalianID
                        where requstPeminjaman.AccountID == id
                        select new
                           {
                            ID = tagihan.ID,
                            TotalBayar = tagihan.TotalBayar,
                            StatusPembayaran = tagihan.StatusPembayaran,
                            NotaID = tagihan.NotaID,
                            UploadDate = tagihan.UploadDate,
                            IsConfirm = tagihan.IsConfirm,
                            PengembalianID = tagihan.PengembalianID
                           };
            return query;
        }

        public int ApproveTagihan(string id)
        {
            var user = new Tagihan { ID = id, IsConfirm = true };
            myContext.Tagihans.Attach(user).Property(x => x.IsConfirm).IsModified = true;
            var save = myContext.SaveChanges();
            return save;
        }

        public int UpdateTagihan(TagihankuVM tagihankuVM)
        {
            

            // set id nota
            int increment = myContext.Notas.ToList().Count;
            string formattedId = "";
            if (increment == 0)
            {
                formattedId = "NOTA" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.Notas.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("A");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedId = "NOTA" + "0" + formulaId.ToString();
            }

            // insert nota
            var nota = new Nota {
                ID = formattedId,
                Image = tagihankuVM.ImageName 
            };
            myContext.Notas.Add(nota);
            var save = myContext.SaveChanges();

            // update tagihan
            // update tagihan
            var tagihan = new Tagihan { 
                ID = tagihankuVM.ID,
                TotalBayar = tagihankuVM.TotalBayar,
                StatusPembayaran = true,
                NotaID = formattedId,
                UploadDate = tagihankuVM.UploadDate,
                IsConfirm = false
            };
            //myContext.Tagihans.Attach(tagihan).Property(x => x.StatusPembayaran).IsModified = true;
            //myContext.Tagihans.Attach(tagihan).Property(x => x.NotaID).IsModified = true;
            myContext.Entry(tagihan).State = EntityState.Modified;
            save = myContext.SaveChanges();

            return save;
        }

    }
}
