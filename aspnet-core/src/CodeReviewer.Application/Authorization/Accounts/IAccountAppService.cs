using System.Threading.Tasks;
using Abp.Application.Services;
using CodeReviewer.Authorization.Accounts.Dto;

namespace CodeReviewer.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
