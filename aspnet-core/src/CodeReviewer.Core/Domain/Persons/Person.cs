using Abp.Domain.Entities.Auditing;
using CodeReviewer.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Domain.Persons
{
    public class Person: FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        [NotMapped]
        public string UserName { get; set; }
        public string Email { get; set; }
        [NotMapped]
        public string Password { get; set; }
        public virtual User UserAccount { get; set; }
    }
}
