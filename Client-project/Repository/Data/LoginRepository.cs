using API_project.Models;
using API_project.ViewModel;
using Client_project.Base;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client_project.Repository.Data
{
    public class LoginRepository : GeneralRepository<Account, int>
    {
        private readonly Address address;
        private readonly string request;
        private readonly HttpClient httpClient;
        public LoginRepository(Address address, string request = "Accounts/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }

        public async Task<JwtTokenVM> Auth(LoginVM login)
        {
            JwtTokenVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Login/", content);

            string apiResponse = await result.Content.ReadAsStringAsync();
            token = JsonConvert.DeserializeObject<JwtTokenVM>(apiResponse);

            return token;
        }
    }
}
