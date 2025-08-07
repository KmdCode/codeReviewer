using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using CodeReviewer.Domain.Developers;
using CodeReviewer.Services.Developers.Dto;
using CodeReviewer.Services.EmailService;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Developers
{
    public class DeveloperAppService : AsyncCrudAppService<Developer, CreateDeveloperDto, Guid>
    {
        private readonly IRepository<Developer, Guid> _developerRepository;
        private readonly DeveloperManager _developerManager;
        private readonly ISendGridEmailService _sendGridEmailService;

        public DeveloperAppService(IRepository<Developer, Guid> developerRepository, DeveloperManager developerManager, ISendGridEmailService sendGrid) : base(developerRepository)
        {
            _developerRepository = developerRepository;
            _developerManager = developerManager;
            _sendGridEmailService = sendGrid;
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

            await _sendGridEmailService.SendEmailAsync(
                input.Email,
                "Welcome to CodeReviewer",
                $"Hello {input.Name},<br/>Thank you for registering as a developer on CodeReviewer. Your account has been successfully created.<br/>Username: {input.Username}<br/>Please keep your credentials safe."
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
                throw new UserFriendlyException("Developer profile not found.");
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
