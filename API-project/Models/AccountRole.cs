using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_tr_accountsroles")]
    public class AccountRole
    {
        [Key]
        public string ID { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
        public string AccountID { get; set; }
        [JsonIgnore]
        public virtual Role Role { get; set; }
        public string RoleID { get; set; }
    }
}
