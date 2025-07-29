using CodeReviewer.Debugging;

namespace CodeReviewer
{
    public class CodeReviewerConsts
    {
        public const string LocalizationSourceName = "CodeReviewer";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "76c82bd8ffeb47a4baac0a693f08f252";
    }
}
