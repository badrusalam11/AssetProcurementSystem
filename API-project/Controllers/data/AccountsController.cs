using API_project.Models;
using API_project.Repository.data;
using API_project.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API_project.Controllers.data
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;
        public IConfiguration _configuration;
        public AccountsController(AccountRepository accountRepository, IConfiguration configuration) : base(accountRepository)
        {
            this.accountRepository = accountRepository;
            this._configuration = configuration;
        }

        [HttpPost("{Login}")]
        public ActionResult Login(LoginVM loginVM)
        {
            var response = accountRepository.Login(loginVM);
            switch (response)
            {
                case 0:
                    return Ok(new JwtTokenVM { status = HttpStatusCode.BadRequest, Token = null, message = "Email Belum Terdaftar" });
                case 1:
                    var getRole = accountRepository.GetRoles(loginVM.Email);
                    var claims = new List<Claim>
                    {
                        new Claim("Email", loginVM.Email)
                    };
                    foreach (var role in getRole)
                    {
                        claims.Add(new Claim("roles", role.ToString()));
                    }
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(10),
                            signingCredentials: signIn
                        );
                    var idToken = new JwtSecurityTokenHandler().WriteToken(token);
                    claims.Add(new Claim("TokenSecurity", idToken.ToString()));
                    return Ok(new JwtTokenVM { status = HttpStatusCode.OK, Token = idToken, message = "Berhasil Login" });
                case 6:
                    return Ok(new JwtTokenVM { status = HttpStatusCode.BadRequest, Token = null, message = "Password Salah" });
                default:
                    return BadRequest(new JwtTokenVM { status = HttpStatusCode.BadRequest, Token = null, message = "Login Gagal" });
            }
        }
    }
}
