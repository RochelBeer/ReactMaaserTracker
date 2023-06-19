using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactMaaserTrackerMUI.Data.Migrations
{
    public partial class mig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SourceId",
                table: "Sources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Income_SourceId",
                table: "Income",
                column: "SourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Income_Sources_SourceId",
                table: "Income",
                column: "SourceId",
                principalTable: "Sources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Income_Sources_SourceId",
                table: "Income");

            migrationBuilder.DropIndex(
                name: "IX_Income_SourceId",
                table: "Income");

            migrationBuilder.DropColumn(
                name: "SourceId",
                table: "Sources");
        }
    }
}
