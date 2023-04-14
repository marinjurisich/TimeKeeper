using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeKeeper.Migrations
{
    public partial class GenerateMonths : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Months",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false),
                    salary = table.Column<double>(type: "float", nullable: false),
                    grade = table.Column<double>(type: "float", nullable: true),
                    workHours = table.Column<double>(type: "float", nullable: false),
                    payPerHour = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Months", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    companyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false),
                    payPerHour = table.Column<double>(type: "float", nullable: false),
                    companyId = table.Column<int>(type: "int", nullable: false),
                    grade = table.Column<double>(type: "float", nullable: true),
                    guid = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UserSalts",
                columns: table => new
                {
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    salt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSalts", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "Workdays",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    projectId = table.Column<int>(type: "int", nullable: true),
                    clockIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    clockOut = table.Column<DateTime>(type: "datetime2", nullable: true),
                    workHours = table.Column<double>(type: "float", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    grade = table.Column<double>(type: "float", nullable: true),
                    attachment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workdays", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "id", "address", "name" },
                values: new object[] { 1, "A demo company address", "D.E.M.O. Company" });

            migrationBuilder.InsertData(
                table: "Months",
                columns: new[] { "id", "date", "grade", "payPerHour", "salary", "userId", "workHours" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5.0, 16.489999999999998, 1752.83203125, 1, 106.29666666666662 },
                    { 2, new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5.0, 16.489999999999998, 4179.830078125, 1, 253.47666666666677 },
                    { 3, new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5.0, 16.489999999999998, 3775.33056640625, 1, 228.94666666666674 },
                    { 4, new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 5.0, 16.489999999999998, 4179.830078125, 1, 253.47666666666677 }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "id", "companyId", "description", "name" },
                values: new object[] { 1, 1, "Official project of the demo company", "A Demo Company's demo project" });

            migrationBuilder.InsertData(
                table: "UserSalts",
                columns: new[] { "email", "salt" },
                values: new object[] { "demo@mail.com", new byte[] { 76, 21, 201, 90, 10, 67, 184, 0, 230, 125, 191, 193, 4, 83, 66, 74, 110, 198, 237, 92, 28, 181, 15, 231, 47, 56, 55, 77, 245, 188, 7, 41, 59, 7, 158, 72, 86, 100, 9, 108, 228, 219, 74, 165, 157, 245, 117, 229, 50, 89, 57, 158, 126, 51, 249, 168, 172, 221, 240, 81, 210, 73, 143, 176 } });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "id", "companyId", "email", "firstName", "grade", "guid", "isAdmin", "lastName", "password", "payPerHour" },
                values: new object[] { 1, 1, "demo@mail.com", "Demo", 5.0, "9de8ec34-e8ec-45f5-af13-877256e6fb95", true, "Account", "80EA7B3C979BF51045EA9EB2FAABBBFC858BECABA5A653EC9E06965DF5FA95843045C25BFD66E63F202FA5E04A9CF7C1F2889F769C0AEEB2458D3F373D1BE439", 16.489999999999998 });

            migrationBuilder.InsertData(
                table: "Workdays",
                columns: new[] { "id", "attachment", "clockIn", "clockOut", "date", "description", "grade", "projectId", "userId", "workHours" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2023, 4, 1, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 1, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 2, null, new DateTime(2023, 4, 2, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 2, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 3, null, new DateTime(2023, 4, 3, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 3, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 4, null, new DateTime(2023, 4, 4, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 4, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 5, null, new DateTime(2023, 4, 5, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 5, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 6, null, new DateTime(2023, 4, 6, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 6, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 7, null, new DateTime(2023, 4, 7, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 7, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 8, null, new DateTime(2023, 4, 8, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 8, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 9, null, new DateTime(2023, 4, 9, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 9, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 10, null, new DateTime(2023, 4, 10, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 10, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 11, null, new DateTime(2023, 4, 11, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 11, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 12, null, new DateTime(2023, 4, 12, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 12, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 13, null, new DateTime(2023, 4, 13, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 13, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 4, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 14, null, new DateTime(2023, 4, 14, 8, 50, 37, 0, DateTimeKind.Unspecified), null, new DateTime(2023, 4, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, null },
                    { 15, null, new DateTime(2023, 3, 1, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 1, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 16, null, new DateTime(2023, 3, 2, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 2, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 17, null, new DateTime(2023, 3, 3, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 3, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 18, null, new DateTime(2023, 3, 4, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 4, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 19, null, new DateTime(2023, 3, 5, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 5, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 20, null, new DateTime(2023, 3, 6, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 6, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 21, null, new DateTime(2023, 3, 7, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 7, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 22, null, new DateTime(2023, 3, 8, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 8, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 23, null, new DateTime(2023, 3, 9, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 9, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 24, null, new DateTime(2023, 3, 10, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 10, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 25, null, new DateTime(2023, 3, 11, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 11, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 26, null, new DateTime(2023, 3, 12, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 12, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 27, null, new DateTime(2023, 3, 13, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 13, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 28, null, new DateTime(2023, 3, 14, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 14, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 29, null, new DateTime(2023, 3, 15, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 15, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 30, null, new DateTime(2023, 3, 16, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 16, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 31, null, new DateTime(2023, 3, 17, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 17, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 32, null, new DateTime(2023, 3, 18, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 18, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 33, null, new DateTime(2023, 3, 19, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 19, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 34, null, new DateTime(2023, 3, 20, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 20, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 }
                });

            migrationBuilder.InsertData(
                table: "Workdays",
                columns: new[] { "id", "attachment", "clockIn", "clockOut", "date", "description", "grade", "projectId", "userId", "workHours" },
                values: new object[,]
                {
                    { 35, null, new DateTime(2023, 3, 21, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 21, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 36, null, new DateTime(2023, 3, 22, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 22, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 37, null, new DateTime(2023, 3, 23, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 23, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 38, null, new DateTime(2023, 3, 24, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 24, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 39, null, new DateTime(2023, 3, 25, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 25, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 40, null, new DateTime(2023, 3, 26, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 26, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 41, null, new DateTime(2023, 3, 27, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 27, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 42, null, new DateTime(2023, 3, 28, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 28, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 43, null, new DateTime(2023, 3, 29, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 29, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 44, null, new DateTime(2023, 3, 30, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 30, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 45, null, new DateTime(2023, 3, 31, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 31, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 46, null, new DateTime(2023, 2, 1, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 1, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 47, null, new DateTime(2023, 2, 2, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 2, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 48, null, new DateTime(2023, 2, 3, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 3, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 49, null, new DateTime(2023, 2, 4, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 4, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 50, null, new DateTime(2023, 2, 5, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 5, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 51, null, new DateTime(2023, 2, 6, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 6, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 52, null, new DateTime(2023, 2, 7, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 7, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 53, null, new DateTime(2023, 2, 8, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 8, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 54, null, new DateTime(2023, 2, 9, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 9, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 55, null, new DateTime(2023, 2, 10, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 10, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 56, null, new DateTime(2023, 2, 11, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 11, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 57, null, new DateTime(2023, 2, 12, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 12, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 58, null, new DateTime(2023, 2, 13, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 13, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 59, null, new DateTime(2023, 2, 14, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 14, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 60, null, new DateTime(2023, 2, 15, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 15, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 61, null, new DateTime(2023, 2, 16, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 16, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 62, null, new DateTime(2023, 2, 17, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 17, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 63, null, new DateTime(2023, 2, 18, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 18, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 64, null, new DateTime(2023, 2, 19, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 19, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 65, null, new DateTime(2023, 2, 20, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 20, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 66, null, new DateTime(2023, 2, 21, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 21, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 67, null, new DateTime(2023, 2, 22, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 22, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 68, null, new DateTime(2023, 2, 23, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 23, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 69, null, new DateTime(2023, 2, 24, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 24, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 70, null, new DateTime(2023, 2, 25, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 25, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 71, null, new DateTime(2023, 2, 26, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 26, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 72, null, new DateTime(2023, 2, 27, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 27, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 73, null, new DateTime(2023, 2, 28, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 28, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 2, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 74, null, new DateTime(2023, 1, 1, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 1, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 75, null, new DateTime(2023, 1, 2, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 2, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 76, null, new DateTime(2023, 1, 3, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 3, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 }
                });

            migrationBuilder.InsertData(
                table: "Workdays",
                columns: new[] { "id", "attachment", "clockIn", "clockOut", "date", "description", "grade", "projectId", "userId", "workHours" },
                values: new object[,]
                {
                    { 77, null, new DateTime(2023, 1, 4, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 4, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 78, null, new DateTime(2023, 1, 5, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 5, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 79, null, new DateTime(2023, 1, 6, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 6, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 80, null, new DateTime(2023, 1, 7, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 7, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 81, null, new DateTime(2023, 1, 8, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 8, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 82, null, new DateTime(2023, 1, 9, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 9, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 83, null, new DateTime(2023, 1, 10, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 10, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 84, null, new DateTime(2023, 1, 11, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 11, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 85, null, new DateTime(2023, 1, 12, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 12, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 86, null, new DateTime(2023, 1, 13, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 13, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 87, null, new DateTime(2023, 1, 14, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 14, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 88, null, new DateTime(2023, 1, 15, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 15, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 89, null, new DateTime(2023, 1, 16, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 16, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 90, null, new DateTime(2023, 1, 17, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 17, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 91, null, new DateTime(2023, 1, 18, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 18, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 92, null, new DateTime(2023, 1, 19, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 19, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 93, null, new DateTime(2023, 1, 20, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 20, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 94, null, new DateTime(2023, 1, 21, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 21, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 95, null, new DateTime(2023, 1, 22, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 22, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 96, null, new DateTime(2023, 1, 23, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 23, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 97, null, new DateTime(2023, 1, 24, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 24, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 98, null, new DateTime(2023, 1, 25, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 25, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 99, null, new DateTime(2023, 1, 26, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 26, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 100, null, new DateTime(2023, 1, 27, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 27, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 101, null, new DateTime(2023, 1, 28, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 28, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 102, null, new DateTime(2023, 1, 29, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 29, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 103, null, new DateTime(2023, 1, 30, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 30, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 },
                    { 104, null, new DateTime(2023, 1, 31, 8, 50, 37, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 31, 17, 1, 13, 0, DateTimeKind.Unspecified), new DateTime(2023, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Worked on Demo Company's demo project", 5.0, 1, 1, 8.1766666666666659 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Months");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserSalts");

            migrationBuilder.DropTable(
                name: "Workdays");
        }
    }
}
