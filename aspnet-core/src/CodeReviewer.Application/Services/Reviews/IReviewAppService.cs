using Abp.Application.Services;
using CodeReviewer.Services.Reviews.Dto;
using CodeReviewer.Services.Reviews.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Reviews
{
    public interface IReviewAppService: IAsyncCrudAppService<ReviewDto, Guid, GetReviewDto, CreateReviewDto, UpdateReviewDto>
    {
    }
}
