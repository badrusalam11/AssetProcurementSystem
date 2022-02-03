using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.ViewModel
{
    public class FormRequestPeminjamanVM
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Keperluan { get; set; }
        public string AccountID { get; set; }
        public string[] BarangID { get; set; }
    }
}
