using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using CodeReviewer.Configuration.Dto;

namespace CodeReviewer.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : CodeReviewerAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
