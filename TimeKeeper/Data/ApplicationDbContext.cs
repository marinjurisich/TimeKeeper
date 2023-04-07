using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Reflection.Metadata;
using TimeKeeper.Models;
using System.Linq;
using TimeKeeper.Data.DbOperations;
using System.Security.Cryptography;
using System.Text;

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

            // Setup
            Random random = new Random();

            #region Seed companies

            // Add first company
            modelBuilder.Entity<Company>()
                .HasData(new Company(
                    id: 1,
                    name: "D.E.M.O. Company",
                    address: "A demo company address")
                );

            // Generate 50 more companies
            Company[] companies = new List<int>(new int[50])
                    // Map each item to a company
                    .Select((_, idx) => new Company(
                        // +2 because of first user
                        id: idx + 2,
                        name: $"Company {idx + 2}",
                        address: $"Ilica {idx + 2}, 10 000 Zagreb"
                    )).ToArray();

            // Add companies
            modelBuilder.Entity<Company>().HasData(companies);

            #endregion

            #region Seed projects

            // Add first project
            Project project0 = new Project(id: 1, name: "Demo", description: "D.E.M.O. company's demo project", companyId: 1);
            modelBuilder.Entity<Project>().HasData(project0);

            // Generate project for each company
            Project[] projects = new List<int>(new int[50])
                    // Map each item into a project
                    .Select((_, idx) => new Project(
                        // +2 because of first project
                        id: idx + 2,
                        name: $"Project {idx + 2}",
                        description: $"This is an auto-generated project for company {companies[idx].name}",
                        companyId: companies[idx].id
                    )).ToArray();

            // Add projects
            modelBuilder.Entity<Project>().HasData(projects);

            #endregion

            #region Seed users

            // Add first user
            int userIdGenerator = 1;
            byte[] salt0;
            User user0 = new User(
                id: userIdGenerator,
                firstName: "John",
                lastName: "Doe",
                email: "demo@mail.com",
                password: HashPassword("TestPassword", out salt0),
                isAdmin: true,
                payPerHour: 10,
                companyId: 1,
                grade: 5,
                guid: Guid.NewGuid().ToString()
                );
            modelBuilder.Entity<User>().HasData(user0);

            // Add first salt
            modelBuilder.Entity<UserSalt>().HasData(new UserSalt(user0.email,salt0));

            // For each company, add 1 admin and 10 users
            // Admin user:
            //  - email:    admin_{ COMPANY_IDX }@mail.com
            //  - password: pass_{ COMPANY_IDX }
            // Worker user:
            //  - email:    user_2@mail.com, user_3@mail.com, ..., user_N@mail.com
            //  - password: pass_2, pass_3, ..., pass_N

            List<User> users = new List<User>(companies.Length * 11);
            List<UserSalt> userSalts = new List<UserSalt>(companies.Length * 11);

            for (int i = 0; i < companies.Length; ++i)
            {
                byte[] adminSalt;
                User adminUser = new User(
                    id: userIdGenerator,
                    firstName: "Admin",
                    lastName: $"Comp {i}",
                    email: $"admin_{i}@mail.com",
                    password: HashPassword($"pass_{i}", out adminSalt),
                    isAdmin: true,
                    payPerHour: 50,
                    companyId: companies[i].id,
                    grade: 5,
                    guid: Guid.NewGuid().ToString()
                    );
                users.Add(adminUser);
                userSalts.Add(new UserSalt(adminUser.email, adminSalt));

                for (int j = 0; j < 10; ++j)
                {
                    ++userIdGenerator;

                    byte[] tempSalt;
                    User tempUser = new User(
                        id: userIdGenerator,
                        firstName: $"John {userIdGenerator}",
                        lastName: $"Doe {userIdGenerator}",
                        email: $"user_{userIdGenerator}@mail.com",
                        password: HashPassword($"pass_{userIdGenerator}", out tempSalt),
                        isAdmin: false,
                        payPerHour: 30 + random.Next(0, 20),
                        companyId: companies[i].id,
                        grade: random.NextDouble() * 5.0,
                        guid: Guid.NewGuid().ToString()
                        );
                    users.Add(tempUser);
                    userSalts.Add(new UserSalt(tempUser.email, tempSalt));
                }
            }

            modelBuilder.Entity<User>().HasData(users);
            modelBuilder.Entity<UserSalt>().HasData(userSalts);

            #endregion

            #region Seed workdays and months

            // Seed months and workdays randomly for first user
            SeedMonthsAndWorkdays(
                modelBuilder,
                user0,
                project0,
                random
                );

            // Seed months and workdays randomly for all users

            for (int i = 0; i < users.Count; ++i)
            {
                SeedMonthsAndWorkdays(
                    modelBuilder,
                    users[i],
                    projects.Where(p => p.companyId == users[i].companyId).First(),
                    random
                    );
            }

            #endregion

        }

        private void SeedMonthsAndWorkdays(ModelBuilder modelBuilder, User user, Project project, Random random)
        {
            int monthCounter = 1;
            int workdayCounter = 1;

            // Generate last 12 months
            for (int i = 0; i < 12; ++i)
            {
                DateTime startDay = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-i);
                List<Workday> monthWorkdays = new List<Workday>(30);

                // For each day, from start to end (if current month, then stop at today's date)
                for (DateTime d = startDay; d.Month == startDay.Month && d.Date < DateTime.Now.Date; d.AddDays(1))
                {
                    DateTime clockIn = new DateTime(d.Year, d.Month, d.Day, 8, 50, 0).AddMinutes(random.Next(10));
                    DateTime clockOut = new DateTime(d.Year, d.Month, d.Day, 17, 0, 0).AddMinutes(random.Next(10));

                    // In 25% of cases, set 1-2h less work hours
                    if (random.Next(100) < 25)
                    {
                        clockOut.AddHours(-random.NextDouble() - 1);
                    }

                    Workday wd = new Workday(
                        id: workdayCounter++,
                        userId: user.id,
                        date: d,
                        projectId: project.id,
                        clockIn: clockIn,
                        clockOut: clockOut,
                        workHours: (clockOut - clockIn).TotalHours,
                        description: $"This is an auto-generated description for project ID {project.id}",
                        grade: random.NextDouble() * 5.0,
                        attachment: null
                    );
                }

                // Generate month summary
                Month month = new Month(
                    id: monthCounter++,
                    date: startDay,
                    userId: user.id,
                    salary: (float) (monthWorkdays.Sum(workday => workday.workHours * user.payPerHour) ?? 0.0),
                    grade: (float) (monthWorkdays.Average(workday => workday.grade) ?? 0.0),
                    workHours: (float) (monthWorkdays.Sum(workday => workday.workHours) ?? 0.0),
                    payPerHour: user.payPerHour
                    );

                // Insert workdays to DB
                modelBuilder.Entity<Workday>().HasData(monthWorkdays);

                // Insert month to DB
                modelBuilder.Entity<Month>().HasData(month);
            }
        }

        private string HashPassword(string password, out byte[] salt)
        {
            int keySize = 64;
            salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations: 350000,
                HashAlgorithmName.SHA512,
                keySize);

            return Convert.ToHexString(hash);
        }

    }
}