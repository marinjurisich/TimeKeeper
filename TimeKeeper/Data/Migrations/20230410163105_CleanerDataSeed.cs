using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeKeeper.Data.Migrations
{
    public partial class CleanerDataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Months",
                keyColumn: "id",
                keyValue: 1,
                column: "grade",
                value: 5.0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "grade", "guid" },
                values: new object[] { 5.0, "e1f7213c-473e-4b78-9a52-786852195d25" });

            migrationBuilder.UpdateData(
                table: "Workdays",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "clockIn", "clockOut", "date", "grade", "workHours" },
                values: new object[] { new DateTime(2023, 4, 9, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 9, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 9, 18, 31, 4, 182, DateTimeKind.Local).AddTicks(396), 5.0, 8.1766666666666659 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Months",
                keyColumn: "id",
                keyValue: 1,
                column: "grade",
                value: 0.0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "grade", "guid" },
                values: new object[] { 0.0, "c2dfa247-a2f1-483d-958f-fbb60a5ec527" });

            migrationBuilder.UpdateData(
                table: "Workdays",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "clockIn", "clockOut", "date", "grade", "workHours" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 8.0 });
        }
    }
}
