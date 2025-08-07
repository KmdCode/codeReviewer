// Dto/ReviewDto.cs
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CodeReviewer.Domain.Reviews;
using System;
using System.Collections.Generic;

namespace CodeReviewer.Services.Reviews.Dto
{
    [AutoMap(typeof(Review))]
    public class ReviewDto: FullAuditedEntityDto<Guid>
    {
        public Guid Id { get; set; }

        public string ReviewName { get; set; }

        public string Language { get; set; }

        public string Code { get; set; }

        public List<string> ReviewResults { get; set; }

        public long UserId { get; set; }


    }
}
