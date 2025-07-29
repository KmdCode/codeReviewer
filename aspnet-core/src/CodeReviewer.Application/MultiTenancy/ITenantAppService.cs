using Abp.Application.Services;
using CodeReviewer.MultiTenancy.Dto;

namespace CodeReviewer.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

