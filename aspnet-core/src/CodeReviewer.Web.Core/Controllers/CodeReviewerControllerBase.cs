using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace CodeReviewer.Controllers
{
    public abstract class CodeReviewerControllerBase: AbpController
    {
        protected CodeReviewerControllerBase()
        {
            LocalizationSourceName = CodeReviewerConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
