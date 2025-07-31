using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Analysis.Dto
{
    public class ViolationDto
    {
        public int Line { get; set; }
        public string Message { get; set; }
    }
}
