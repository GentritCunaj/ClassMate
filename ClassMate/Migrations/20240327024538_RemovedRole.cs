using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassMate.Migrations
{
    /// <inheritdoc />
    public partial class RemovedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "StudyGroupId",
                table: "Resources",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources",
                column: "StudyGroupId",
                principalTable: "StudyGroups",
                principalColumn: "StudyGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources");

            migrationBuilder.AlterColumn<string>(
                name: "StudyGroupId",
                table: "Resources",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources",
                column: "StudyGroupId",
                principalTable: "StudyGroups",
                principalColumn: "StudyGroupId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
