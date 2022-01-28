using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_m_types")]
    public class Type
    {
        [Key]
        public string ID { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<Barang> Barangs { get; set; }
    }
}
