using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CodeReviewer.Authorization.Roles;
using CodeReviewer.Authorization.Users;
using CodeReviewer.MultiTenancy;
using CodeReviewer.Domain.Developers;

namespace CodeReviewer.EntityFrameworkCore
{
    public class CodeReviewerDbContext : AbpZeroDbContext<Tenant, Role, User, CodeReviewerDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Developer> Developers { get; set; }
        
        public CodeReviewerDbContext(DbContextOptions<CodeReviewerDbContext> options)
            : base(options)
        {
        }
    }
}
