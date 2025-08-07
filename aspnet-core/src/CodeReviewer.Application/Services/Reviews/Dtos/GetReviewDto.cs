using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Reviews.Dtos
{
    public class GetReviewDto : PagedAndSortedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
