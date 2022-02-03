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
    public class RequestPeminjamanRepository : GeneralRepository<RequestPeminjaman, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly HttpClient httpClient;

        public RequestPeminjamanRepository(Address address, string request = "RequestPeminjaman/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public Object InsertRequestPeminjaman(FormRequestPeminjamanVM formRequestPeminjamanVM)
        {

            StringContent content = new StringContent(JsonConvert.SerializeObject(formRequestPeminjamanVM), Encoding.UTF8, "application/json");
            Object entities = new Object();

            using (var response = httpClient.PostAsync(request + "insertRequestPeminjaman/", content).Result)
            {
                string apiResponse = response.Content.ReadAsStringAsync().Result;
                entities = JsonConvert.DeserializeObject<Object>(apiResponse);
            }

            return entities;

        }


    }
}
