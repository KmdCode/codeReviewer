using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace CodeReviewer.Localization
{
    public static class CodeReviewerLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(CodeReviewerConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(CodeReviewerLocalizationConfigurer).GetAssembly(),
                        "CodeReviewer.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
