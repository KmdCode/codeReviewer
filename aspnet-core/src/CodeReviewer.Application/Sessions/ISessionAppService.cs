using System.Threading.Tasks;
using Abp.Application.Services;
using CodeReviewer.Sessions.Dto;

namespace CodeReviewer.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
