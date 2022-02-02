using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client_project.Repository.Data
{
    public class BarangRepository : GeneralRepository<Barang, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly HttpClient httpClient;
        private readonly IWebHostEnvironment webHostEnvironment;

        public BarangRepository(Address address, IWebHostEnvironment webHostEnvironment, string request = "Barang/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            this.webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<Barang>> GetAllBarang()
        {
            List<Barang> entities = new List<Barang>();

            using (var response = await httpClient.GetAsync(request + "GetAllBarang/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Barang>>(apiResponse);
            }
            return entities;
        }

        public Object UpdateBarang(FormBarangVM barang)
        {
            string uniqueFileName = null;
            Object item;
            if (barang.Image != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "img");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + barang.Image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    barang.Image.CopyTo(fileStream);
                }
                item = new Barang
                {
                    ID = barang.ID,
                    Name = barang.Name,
                    TypeID = barang.TypeID,
                    Deskripsi = barang.Deskripsi,
                    Keterangan = barang.Keterangan,
                    IsActive = true,
                    Image = uniqueFileName
                };
            }
            else
            {
                item = new Barang
                {
                    ID = barang.ID,
                    Name = barang.Name,
                    TypeID = barang.TypeID,
                    Deskripsi = barang.Deskripsi,
                    Keterangan = barang.Keterangan,
                    IsActive = true,
                    Image = barang.ImageName
                };
            }


            StringContent content = new StringContent(JsonConvert.SerializeObject(item), Encoding.UTF8, "application/json");
            Object entity = new Object();

            using (var response = httpClient.PutAsync(request, content).Result)
            {
                string apiResponse = response.Content.ReadAsStringAsync().Result;
                entity = JsonConvert.DeserializeObject<Object>(apiResponse);
            }
            return entity;
        }

        public Object InsertBarang(FormBarangVM formBarangVM)
        {
            string uniqueFileName = null;
            if (formBarangVM.Image != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "img");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + formBarangVM.Image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    formBarangVM.Image.CopyTo(fileStream);
                }
            }

            Object barang = new Barang
            {
                ID = formBarangVM.ID,
                Name = formBarangVM.Name,
                TypeID = formBarangVM.TypeID,
                Deskripsi = formBarangVM.Deskripsi,
                Keterangan = formBarangVM.Keterangan,
                IsActive = true,
                Image = uniqueFileName
            };

            StringContent content = new StringContent(JsonConvert.SerializeObject(barang), Encoding.UTF8, "application/json");
            Object entities = new Object();

            using (var response = httpClient.PostAsync(request + "insertbarang/", content).Result)
            {
                string apiResponse = response.Content.ReadAsStringAsync().Result;
                entities = JsonConvert.DeserializeObject<Object>(apiResponse);
            }

            return entities;

        }

        public HttpStatusCode DeleteBarang(string id)
        {
            var result = httpClient.DeleteAsync(request + "DeleteBarang/" + id).Result;
            return result.StatusCode;
        }



    }
}
