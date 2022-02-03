using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.ViewModel
{
    public class FormReturnVM
    {
        public string RequestID { get; set; }
        public List<Dictionary<string, object>> ItemReturn { get; set; }
    }
}
