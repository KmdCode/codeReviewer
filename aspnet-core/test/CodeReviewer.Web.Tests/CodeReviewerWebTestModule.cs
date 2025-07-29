using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CodeReviewer.EntityFrameworkCore;
using CodeReviewer.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace CodeReviewer.Web.Tests
{
    [DependsOn(
        typeof(CodeReviewerWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class CodeReviewerWebTestModule : AbpModule
    {
        public CodeReviewerWebTestModule(CodeReviewerEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CodeReviewerWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(CodeReviewerWebMvcModule).Assembly);
        }
    }
}