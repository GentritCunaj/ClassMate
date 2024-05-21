using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassMate.Migrations
{
    /// <inheritdoc />
    public partial class SubmissionChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileContent",
                table: "Submissions");

            migrationBuilder.AddColumn<bool>(
                name: "IsSubmitted",
                table: "Submissions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<byte[]>(
                name: "SubmittedFile",
                table: "Submissions",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSubmitted",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "SubmittedFile",
                table: "Submissions");

            migrationBuilder.AddColumn<byte[]>(
                name: "FileContent",
                table: "Submissions",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
