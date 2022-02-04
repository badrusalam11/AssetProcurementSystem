using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client_project.Repository.Data
{
    public class TagihanRepository : GeneralRepository<Tagihan, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly HttpClient httpClient;
        private readonly IWebHostEnvironment webHostEnvironment;

        public TagihanRepository(Address address, IWebHostEnvironment webHostEnvironment, string request = "Tagihan/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            this.webHostEnvironment = webHostEnvironment;
        }

        public Object UpdateTagihan(TagihankuVM Tagihan)
        {
            string uniqueFileName = null;
            Object item;
            if (Tagihan.Image != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "img");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + Tagihan.Image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    Tagihan.Image.CopyTo(fileStream);
                }
            }
                item = new TagihankuVM
                {
                    ID = Tagihan.ID,
                    TotalBayar = Tagihan.TotalBayar,
                    StatusPembayaran = Tagihan.StatusPembayaran,
                    NotaID = Tagihan.NotaID,
                    UploadDate = Tagihan.UploadDate,
                    IsConfirm = Tagihan.IsConfirm,
                    PengembalianID = Tagihan.PengembalianID,
                    ImageName = uniqueFileName
                };
           


            StringContent content = new StringContent(JsonConvert.SerializeObject(item), Encoding.UTF8, "application/json");
            Object entity = new Object();

            using (var response = httpClient.PutAsync(request + "UpdateTagihan", content).Result)
            {
                string apiResponse = response.Content.ReadAsStringAsync().Result;
                entity = JsonConvert.DeserializeObject<Object>(apiResponse);
            }
            return entity;
        }

    }
}
