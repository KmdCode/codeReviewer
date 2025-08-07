using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CodeReviewer.Domain.Reviews;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Reviews.Dtos
{
    [AutoMap(typeof(Review))]
    public class CreateReviewDto: EntityDto<Guid>
    {
        [Required]
        public string ReviewName { get; set; }

        [Required]
        public string Language { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string ReviewType { get; set; }

        public List<ReviewResult> ReviewResults { get; set; } = new List<ReviewResult>();
    }
}
