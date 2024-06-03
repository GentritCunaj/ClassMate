using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassMate.Migrations
{
    /// <inheritdoc />
    public partial class subjectkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_StudentId",
                table: "QuizAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Subjects_SubjectId",
                table: "Quizzes");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Subjects_SubjectId",
                table: "Resources");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Resources",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Quizzes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "QuizAttempts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Assignments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_StudentId",
                table: "QuizAttempts",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Subjects_SubjectId",
                table: "Quizzes",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Subjects_SubjectId",
                table: "Resources",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.SetNull);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_StudentId",
                table: "QuizAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Subjects_SubjectId",
                table: "Quizzes");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Subjects_SubjectId",
                table: "Resources");

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Resources",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "QuizAttempts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SubjectId",
                table: "Assignments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Subjects_SubjectId",
                table: "Assignments",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_StudentId",
                table: "QuizAttempts",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Subjects_SubjectId",
                table: "Quizzes",
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
    }
}
