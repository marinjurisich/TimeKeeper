using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeKeeper.Data.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "id", "address", "name" },
                values: new object[] { 1, "A demo company address", "D.E.M.O. Company" });

            migrationBuilder.InsertData(
                table: "Months",
                columns: new[] { "id", "date", "grade", "payPerHour", "salary", "userId", "workHours" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0.0, 16.489999999999998, 2637.330078125, 1, 160.0 });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "id", "companyId", "description", "name" },
                values: new object[] { 1, 1, "Official project of the demo company", "A Demo Company's demo project" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "id", "companyId", "email", "firstName", "grade", "guid", "isAdmin", "lastName", "password", "payPerHour" },
                values: new object[] { 1, 1, "demo@mail.com", "Demo", 0.0, "not-a-guid", true, "Account", "pass", 4.4500000000000002 });

            migrationBuilder.InsertData(
                table: "Workdays",
                columns: new[] { "id", "attachment", "clockIn", "clockOut", "date", "description", "grade", "projectId", "userId", "workHours" },
                values: new object[] { 1, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 0.0, 1, 1, 8.0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Months",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Workdays",
                keyColumn: "id",
                keyValue: 1);
        }
    }
}
