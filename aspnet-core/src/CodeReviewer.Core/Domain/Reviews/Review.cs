using Abp.Domain.Entities.Auditing;
using CodeReviewer.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace CodeReviewer.Domain.Reviews
{
    public class Review : FullAuditedEntity<Guid>
    {
        public string ReviewName { get; set; }

        public string Language { get; set; }

        [Column(TypeName = "text")] 
        public string Code { get; set; }

        [Column(TypeName = "text")] 
        public string ReviewResultsJson { get; set; }

        public long UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User UserAccount { get; set; }

        [NotMapped]
        public List<string> ReviewResults
        {
            get => string.IsNullOrEmpty(ReviewResultsJson)
                ? new List<string>()
                : JsonSerializer.Deserialize<List<string>>(ReviewResultsJson);
            set => ReviewResultsJson = JsonSerializer.Serialize(value);
        }
    }
}
