using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_tr_pengembalian")]
    public class Pengembalian
    {
        [Key]
        public string ID { get; set; }
        public DateTime TanggalKembali { get; set; }
        public string DeskripsiKondisi { get; set; }
        public Boolean KondisiBarang { get; set; }
        public Boolean IsConfirm { get; set; }
        [JsonIgnore]
        public virtual Tagihan Tagihan { get; set; }
        [JsonIgnore]
        public virtual Peminjaman  Peminjaman { get; set; }
    }
}
