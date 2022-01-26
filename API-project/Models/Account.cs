using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_m_accounts")]
    public class Account
    {
        [Key]
        public string ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int OTP { get; set; }
        public DateTime ExpiredToken { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsUsed { get; set; }
        [JsonIgnore]
        public virtual Employee Employee { get; set; }
        public string EmployeeID { get; set; }
        [JsonIgnore]
        public virtual ICollection<AccountRole> AccountRoles { get; set; }
        public virtual ICollection<RequestPeminjaman> RequestPeminjaman { get; set; }
    }
}
