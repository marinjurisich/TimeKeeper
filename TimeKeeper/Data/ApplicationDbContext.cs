using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Reflection.Metadata;
using TimeKeeper.Models;

namespace TimeKeeper.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Month> Months { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Workday> Workdays { get; set; }
        public DbSet<UserSalt> UserSalts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

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
            double userPayPerHour = 16.49;
            modelBuilder.Entity<User>()
                .HasData(new User(
                    id: 1,
                    firstName: "Demo",
                    lastName: "Account",
                    email: "demo@mail.com",
                    password: "80EA7B3C979BF51045EA9EB2FAABBBFC858BECABA5A653EC9E06965DF5FA95843045C25BFD66E63F202FA5E04A9CF7C1F2889F769C0AEEB2458D3F373D1BE439",
                    isAdmin: true,
                    payPerHour: userPayPerHour,
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

            // Create project
            modelBuilder.Entity<Project>()
                .HasData(new Project(
                    1, "A Demo Company's demo project", "Official project of the demo company", 1
                    ));

            // Generate last 4 months of Month and Workday objects

            List<Month> allMonths = new List<Month>();
            List<Workday> allWorkdays = new List<Workday>();

            int generateMonths = 4;
            int workdayDbIndex = 1;
            for (int monthIdx = 0; monthIdx < generateMonths; ++monthIdx)
            {
                // Initialize loop
                var dStart = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-monthIdx);
                var dEnd = dStart.AddMonths(1);

                // Generate workdays
                List<Workday> workdays = new List<Workday>();

                for (var d = dStart; d.Date < dEnd.Date && d.Date <= DateTime.Now.Date; d = d.AddDays(1))
                {
                    if (d.Date == DateTime.Now.Date && DateTime.Now.Hour < 9)
                    {
                        // Do not generate workday for today if it has not started
                        continue;
                    }

                    string d_iso = d.ToString("yyyy-MM-dd");
                    DateTime clockIn = DateTime.Parse($"{d_iso} 8:50:37");
                    DateTime? clockOut = null;
                    double? workHours = null;

                    // If "d" is not today, generate clock out
                    if (d.Date != DateTime.Now.Date)
                    {
                        clockOut = DateTime.Parse($"{d_iso} 17:01:13");
                        workHours = (clockOut - clockIn).Value.TotalHours;
                    }

                    Workday wd = new Workday(
                        id: workdayDbIndex++,
                        userId: 1,
                        date: d,
                        projectId: 1,
                        clockIn: clockIn,
                        clockOut: clockOut,
                        workHours: workHours,
                        description: "Worked on Demo Company's demo project",
                        grade: 5.0,
                        attachment: null
                    );
                    workdays.Add(wd);
                }

                // Generate month
                double monthWorkHours = workdays.Sum(workday => workday.workHours ?? 0.0);
                Month month = new Month(
                    id: monthIdx + 1,
                    date: dStart.Date,
                    userId: 1,
                    salary: (float)(monthWorkHours * userPayPerHour),
                    grade: 5.0,
                    workHours: monthWorkHours,
                    payPerHour: userPayPerHour
                );

                allMonths.Add(month);
                allWorkdays.AddRange(workdays);
            }

            // Add to db
            foreach(var month in allMonths)
            {
                modelBuilder.Entity<Month>().HasData(month);
            }
            foreach(var workday in allWorkdays)
            {
                modelBuilder.Entity<Workday>().HasData(workday);
            }

        }

    }
}