using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using CodeReviewer.Domain.Developers;
using CodeReviewer.Services.Developers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Developers
{
    public class DeveloperAppService : AsyncCrudAppService<Developer, CreateDeveloperDto, Guid>
    {
        private readonly IRepository<Developer, Guid> _developerRepository;
        private readonly DeveloperManager _developerManager;

        public DeveloperAppService(IRepository<Developer, Guid> developerRepository, DeveloperManager developerManager):base(developerRepository)
        {
            _developerRepository = developerRepository;
            _developerManager = developerManager;
        }

        public override async Task<CreateDeveloperDto> CreateAsync (CreateDeveloperDto input)
        {
            
                var newDeveloper = await _developerManager.CreateDeveloperAsync
                    (
                        input.Name,
                        input.Surname,
                        input.Username,
                        input.Email,
                        input.Password
                    );

                return input;
            
        }

    }
}
