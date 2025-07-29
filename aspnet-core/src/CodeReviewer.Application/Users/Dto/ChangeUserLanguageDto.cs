using System.ComponentModel.DataAnnotations;

namespace CodeReviewer.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}