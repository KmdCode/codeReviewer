using System.Threading.Tasks;
using CodeReviewer.Configuration.Dto;

namespace CodeReviewer.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
