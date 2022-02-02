using API_project.Context;
using API_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class BarangRepository : GeneralRepository<MyContext, Barang, string>
    {
        private readonly MyContext myContext;
        public BarangRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable<Object> GetAllBarang()
        {
            return myContext.Barangs.Where(b => b.IsActive == true).ToList();
        }

            public int InsertBarang(Barang barang)
        {
            int increment = myContext.Barangs.ToList().Count;
            string formattedId = "";
            if (increment == 0)
            {
                formattedId = "BRG" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.Barangs.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("G");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedId = "BRG" + "0" + formulaId.ToString();
            }

            var formattedBarang = new Barang
            {
                ID = formattedId,
                Name = barang.Name,
                Keterangan = barang.Keterangan,
                IsActive = true,
                Deskripsi = barang.Deskripsi,
                Image = barang.Image,
                TypeID = barang.TypeID
            };
            myContext.Barangs.Add(formattedBarang);
            var response = myContext.SaveChanges();
            return response;
        }
        
        public int DeleteBarang (string id)
        {
            var user = new Barang { ID = id, IsActive =  false};
            myContext.Barangs.Attach(user).Property(x => x.IsActive).IsModified = true;
            var save = myContext.SaveChanges();
            return save;
        }

    }
}
