using Abp.Application.Services.Dto;

namespace CodeReviewer.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

