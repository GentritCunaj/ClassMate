using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassMate.Migrations
{
    /// <inheritdoc />
    public partial class SubjectRemovedFromQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_StudyGroupId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "StudyGroupId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Quizzes");

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "Resources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "Assignments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    SubjectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.SubjectId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Resources_SubjectId",
                table: "Resources",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_SubjectId",
                table: "Assignments",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Subjects_SubjectId",
                table: "Resources",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Subjects_SubjectId",
                table: "Resources");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropIndex(
                name: "IX_Resources_SubjectId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Assignments_SubjectId",
                table: "Assignments");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "Assignments");

            migrationBuilder.AddColumn<string>(
                name: "StudyGroupId",
                table: "Resources",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Quizzes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_StudyGroupId",
                table: "Resources",
                column: "StudyGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_StudyGroups_StudyGroupId",
                table: "Resources",
                column: "StudyGroupId",
                principalTable: "StudyGroups",
                principalColumn: "StudyGroupId");
        }
    }
}
