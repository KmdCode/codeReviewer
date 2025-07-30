using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeReviewer.Migrations
{
    /// <inheritdoc />
    public partial class AddedthreeDev : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Developers",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Developers",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Developers",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Developers",
                newName: "Password");
        }
    }
}
