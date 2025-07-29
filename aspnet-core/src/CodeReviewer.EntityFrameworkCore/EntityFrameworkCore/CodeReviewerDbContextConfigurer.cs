using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CodeReviewer.EntityFrameworkCore
{
    public static class CodeReviewerDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CodeReviewerDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CodeReviewerDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
