using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Models
{
    [Table("tb_m_nota")]
    public class Nota
    {
        [Key]
        public string ID { get; set; }
        public string Image { get; set; }
        public virtual ICollection<Tagihan> Tagihans { get; set; }
    }
}
