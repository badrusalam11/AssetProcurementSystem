using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_tr_tagihan")]
    public class Tagihan
    {
        [Key]
        public string ID { get; set; }
        public int TotalBayar { get; set; }
        public Boolean StatusPembayaran { get; set; }
        [JsonIgnore]
        public virtual Nota Nota { get; set; }
        public string NotaID { get; set; }
        [JsonIgnore]
        public virtual Pengembalian Pengembalian  { get; set; }
        public string PengembalianID { get; set; }
    }
}
