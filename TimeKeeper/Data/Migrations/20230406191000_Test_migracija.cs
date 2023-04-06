using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeKeeper.Data.Migrations
{
    public partial class Test_migracija : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserSalts",
                columns: new[] { "email", "salt" },
                values: new object[] { "demo@mail.com", new byte[] { 76, 21, 201, 90, 10, 67, 184, 0, 230, 125, 191, 193, 4, 83, 66, 74, 110, 198, 237, 92, 28, 181, 15, 231, 47, 56, 55, 77, 245, 188, 7, 41, 59, 7, 158, 72, 86, 100, 9, 108, 228, 219, 74, 165, 157, 245, 117, 229, 50, 89, 57, 158, 126, 51, 249, 168, 172, 221, 240, 81, 210, 73, 143, 176 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "guid", "password" },
                values: new object[] { "c2dfa247-a2f1-483d-958f-fbb60a5ec527", "80EA7B3C979BF51045EA9EB2FAABBBFC858BECABA5A653EC9E06965DF5FA95843045C25BFD66E63F202FA5E04A9CF7C1F2889F769C0AEEB2458D3F373D1BE439" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserSalts",
                keyColumn: "email",
                keyValue: "demo@mail.com");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "guid", "password" },
                values: new object[] { "not-a-guid", "pass" });
        }
    }
}
