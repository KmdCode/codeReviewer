using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using CodeReviewer.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CodeReviewer.Domain.Developers
{
    public class DeveloperManager: DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Developer, Guid> _developerRepository;


        public DeveloperManager(UserManager userManager, IRepository<Developer, Guid> developerRepository)
        {
            _userManager = userManager;
            _developerRepository = developerRepository;
        }

        public async Task<Developer> CreateDeveloperAsync
            (
                string name,
                string surname,
                string username,
                string email,
                string password
            )
        {

            var user = new User
            {
                Name = name,
                Surname = surname,
                UserName = username,
                EmailAddress = email,
                Password = password
            };

            var userCreationResult = await _userManager.CreateAsync(user, password);

            if (!userCreationResult.Succeeded)
            {
                throw new UserFriendlyException($"User creation failed");
            }

            await _userManager.AddToRoleAsync(user, "Developer");

            Developer developer = new Developer
            {
                Name = name,
                Surname = surname,
                UserName=username,
                Email = email,
                UserAccount = user
            };

            await _developerRepository.InsertAsync(developer);

            return developer;

        }

}



}