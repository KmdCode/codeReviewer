using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeReviewer.Migrations
{
    /// <inheritdoc />
    public partial class savereviews11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReviewType",
                table: "Reviews",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewType",
                table: "Reviews");
        }
    }
}
