﻿using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CodeReviewer.Authorization;

namespace CodeReviewer
{
    [DependsOn(
        typeof(CodeReviewerCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class CodeReviewerApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<CodeReviewerAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CodeReviewerApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
