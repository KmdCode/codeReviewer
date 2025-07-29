using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CodeReviewer.Configuration;

namespace CodeReviewer.Web.Host.Startup
{
    [DependsOn(
       typeof(CodeReviewerWebCoreModule))]
    public class CodeReviewerWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public CodeReviewerWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CodeReviewerWebHostModule).GetAssembly());
        }
    }
}
