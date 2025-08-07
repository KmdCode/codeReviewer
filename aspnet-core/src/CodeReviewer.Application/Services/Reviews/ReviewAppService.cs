using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using AutoMapper.Internal.Mappers;
using CodeReviewer.Domain.Reviews;
using CodeReviewer.Services.Reviews.Dto;
using CodeReviewer.Services.Reviews.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Reviews
{
    public class ReviewAppService : AsyncCrudAppService<
       Review,
       ReviewDto,
       Guid,
       GetReviewDto,
       CreateReviewDto,
       UpdateReviewDto
   >, IReviewAppService
    {
        private readonly IAbpSession _abpSession;

        public ReviewAppService(
            IRepository<Review, Guid> repository,
            IAbpSession abpSession
        ) : base(repository)
        {
            _abpSession = abpSession;
        }

        protected override IQueryable<Review> CreateFilteredQuery(GetReviewDto input)
        {
            var query = base.CreateFilteredQuery(input)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), r =>
                    r.ReviewName.Contains(input.Keyword) ||
                    r.Language.Contains(input.Keyword))
                .Where(r => r.UserId == _abpSession.GetUserId());

            return query;
        }

        public override async Task<ReviewDto> CreateAsync(CreateReviewDto input)
        {
            var entity = ObjectMapper.Map<Review>(input);
            entity.UserId = _abpSession.GetUserId();

            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            entity = await Repository.GetAllIncluding(x => x.UserAccount)
                         .FirstOrDefaultAsync(x => x.Id == entity.Id);

            return MapToEntityDto(entity);
        }
    }
}
