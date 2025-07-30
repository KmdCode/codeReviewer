using Abp.Application.Services;
using CodeReviewer.Services.Developers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Developers
{
    public interface IDeveloperAppService : IAsyncCrudAppService<CreateDeveloperDto, Guid>
    {

    }
}
