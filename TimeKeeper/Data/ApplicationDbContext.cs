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

            modelBuilder.Entity<Company>()
                .HasData(new Company(
                    1, "D.E.M.O. Company", "A demo company address"
                    ));

            modelBuilder.Entity<User>()
                .HasData(new User(
                    1, "Demo", "Account","demo@mail.com", "pass", true,4.45, 1, 0, "not-a-guid"
                    ));

            modelBuilder.Entity<Month>()
                .HasData(new Month(
                    1, new DateTime(), 1, (float) 2637.33, 0, 160, 16.49
                    ));

            modelBuilder.Entity<Project>()
                .HasData(new Project(
                    1, "A Demo Company's demo project", "Official project of the demo company", 1
                    ));

            modelBuilder.Entity<Workday>()
                .HasData(new Workday(1, 1, new DateTime(), 1, new DateTime(), new DateTime(), 8, "Worked on Demo Company's demo project", 0, null
                    ));

        }

    }
}