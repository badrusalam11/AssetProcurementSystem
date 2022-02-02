using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_m_barang")]
    public class Barang
    {
        [Key]
        public string ID { get; set; }
        public string Name { get; set; }
        public string Deskripsi { get; set; }
        public string Keterangan { get; set; }
        public string Image { get; set; }
        public Boolean IsActive  { get; set; }

        //[JsonIgnore]
        public virtual Type Type { get; set; }
        public string TypeID { get; set; }
        [JsonIgnore]
        public virtual ICollection<Peminjaman> Peminjaman { get; set; }
    }
}
