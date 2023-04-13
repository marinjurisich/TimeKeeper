using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Reflection.Metadata;
using TimeKeeper.Models;

namespace TimeKeeper.Data {
    public class ApplicationDbContext :DbContext  {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Month> Months { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Workday> Workdays { get; set; }
        public DbSet<UserSalt> UserSalts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            // Create company
            modelBuilder.Entity<Company>()
                .HasData(new Company(
                    id: 1,
                    name: "D.E.M.O. Company",
                    address: "A demo company address"
                ));

            // Create user:
            //      email    - demo@mail.com
            //      password - TestPassword
            modelBuilder.Entity<User>()
                .HasData(new User(
                    id: 1,
                    firstName: "Demo",
                    lastName: "Account",
                    email: "demo@mail.com",
                    password: "80EA7B3C979BF51045EA9EB2FAABBBFC858BECABA5A653EC9E06965DF5FA95843045C25BFD66E63F202FA5E04A9CF7C1F2889F769C0AEEB2458D3F373D1BE439",
                    isAdmin: true,
                    payPerHour: 4.45,
                    companyId: 1,
                    grade: 5.0,
                    guid: System.Guid.NewGuid().ToString()
                ));

            // Create user salt
            modelBuilder.Entity<UserSalt>()
                .HasData(new UserSalt(
                    email: "demo@mail.com",
                    salt: Convert.FromBase64String("TBXJWgpDuADmfb/BBFNCSm7G7VwctQ/nLzg3TfW8Byk7B55IVmQJbOTbSqWd9XXlMlk5nn4z+ais3fBR0kmPsA=="))
                );

            // Create month
            modelBuilder.Entity<Month>()
                .HasData(new Month(
                    id: 1,
                    date: new DateTime(),
                    userId: 1,
                    salary: (float) 2637.33,
                    grade: 5.0,
                    workHours: 160,
                    payPerHour: 16.49
                ));

            // Create project
            modelBuilder.Entity<Project>()
                .HasData(new Project(
                    1, "A Demo Company's demo project", "Official project of the demo company", 1
                    ));

            // Prepare workday
            var yesterday = DateTime.Now.AddDays(-1);
            string yesterday_iso = yesterday.ToString("yyyy-MM-dd");
            DateTime clockIn = DateTime.Parse($"{yesterday_iso} 8:50:37");
            DateTime clockOut = DateTime.Parse($"{yesterday_iso} 17:01:13");

            // Create workday
            modelBuilder.Entity<Workday>()
                .HasData(new Workday(
                    id: 1,
                    userId: 1,
                    date: yesterday,
                    projectId: 1,
                    clockIn: clockIn,
                    clockOut: clockOut,
                    workHours: (clockOut - clockIn).TotalHours,
                    description: "Worked on Demo Company's demo project",
                    grade: 5.0,
                    attachment: null
                ));

        }

    }
}