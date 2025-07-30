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
    public class DeveloperDto : FullAuditedEntityDto<Guid>
    {
        [AutoMap(typeof(Developer))]
        public string Name { get; set; }
        public string Email  { get; set; }

    }
}
