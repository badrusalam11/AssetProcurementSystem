using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_tr_requestpeminjaman")]
    public class RequestPeminjaman
    {
        [Key]
        public string ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Keperluan { get; set; }
        public Approval Approval { get; set; }
        [JsonIgnore]
        public virtual Account Account  { get; set; }
        public string AccountID { get; set; }
        public virtual ICollection<Peminjaman> Peminjaman { get; set; }

    }
    public enum Approval { Approved, Rejected, Pennding}
}
