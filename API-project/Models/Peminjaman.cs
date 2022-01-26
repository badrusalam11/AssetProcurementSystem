using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_tr_peminjaman")]
    public class Peminjaman
    {
        [Key]
        public string ID { get; set; }
        public Boolean KondisiBarang { get; set; }
        public string DeskripsiKondisi { get; set; }
        public bool IsActive { get; set; }
        [JsonIgnore]
        public virtual RequestPeminjaman RequestPeminjaman { get; set; }
        public string RequestPeminjamanID { get; set; }
        [JsonIgnore]
        public virtual Barang Barang { get; set; }
        public string BarangID { get; set; }
        [JsonIgnore]
        public virtual Pengembalian Pengembalian { get; set; }

    }
}
