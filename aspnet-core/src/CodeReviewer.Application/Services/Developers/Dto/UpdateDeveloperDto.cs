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
    public class UpdateDeveloperDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        
    }
}
