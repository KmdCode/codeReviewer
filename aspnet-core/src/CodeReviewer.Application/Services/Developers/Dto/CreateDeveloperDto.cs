using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CodeReviewer.Domain.Developers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.Developers.Dto
{
    [AutoMap(typeof(Developer))]
    public class CreateDeveloperDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
