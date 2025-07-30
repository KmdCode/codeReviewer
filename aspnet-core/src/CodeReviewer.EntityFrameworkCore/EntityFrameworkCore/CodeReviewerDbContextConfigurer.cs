using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CodeReviewer.EntityFrameworkCore
{
    public static class CodeReviewerDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CodeReviewerDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CodeReviewerDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
