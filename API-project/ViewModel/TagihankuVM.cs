using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.ViewModel
{
    public class TagihankuVM
    {
        public string ID { get; set; }
        public int TotalBayar { get; set; }
        public Boolean StatusPembayaran { get; set; }
        public string NotaID { get; set; }
        public DateTime UploadDate { get; set; }
        public Boolean IsConfirm { get; set; }
        public string PengembalianID { get; set; }
        public IFormFile Image { get; set; }
        public string ImageName { get; set; }
    }
}
