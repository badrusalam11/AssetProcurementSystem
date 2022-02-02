using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.ViewModel
{
    public class FormBarangVM
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Deskripsi { get; set; }
        public string Keterangan { get; set; }
        public string TypeID { get; set; }
        public IFormFile Image { get; set; }
        public string ImageName { get; set; }
    }
}
