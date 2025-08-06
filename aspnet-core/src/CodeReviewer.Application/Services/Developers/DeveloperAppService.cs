using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using CodeReviewer.Domain.Developers;
using CodeReviewer.Services.Developers.Dto;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<GetDeveloperDto> GetDeveloperProfileAsync()
        {
            var developer = await _developerRepository
                .GetAll().
                Include(s => s.UserAccount).
                FirstOrDefaultAsync(s => s.UserAccount != null && s.UserAccount.Id == AbpSession.UserId.Value);
                
            if (developer == null)
            {
                throw new UserFriendlyException("Patient profile not found.");
            }

            return new GetDeveloperDto
            {
                Id = developer.Id,
                Name = developer.Name,
                Surname = developer.Surname,
            };
        }

        public async Task<UpdateDeveloperDto> UpdateDeveloperAsync(UpdateDeveloperDto input)
        {
            var developer = await _developerRepository
                .GetAll()
                .Include(d => d.UserAccount)
                .FirstOrDefaultAsync(d => d.UserAccount != null && d.UserAccount.Id == AbpSession.UserId.Value);

            if (developer == null)
            {
                throw new UserFriendlyException("Developer profile not found.");
            }

            developer.Name = input.Name;
            developer.Surname = input.Surname;

            await _developerRepository.UpdateAsync(developer);
            return new UpdateDeveloperDto
            {
                Id = developer.Id,
                Name = developer.Name,
                Surname = developer.Surname
            };
        }

    }
}
