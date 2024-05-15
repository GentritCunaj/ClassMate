﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassMate.Migrations
{
    /// <inheritdoc />
    public partial class SubjectBoolAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isSubject",
                table: "StudyGroups",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isSubject",
                table: "StudyGroups");
        }
    }
}
