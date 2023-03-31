using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using TimeKeeper.Controllers;
using TimeKeeper.Data;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper {
    public class Program {
        public static void Main(string[] args) {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            //var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            //builder.Services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer(connectionString));

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("TimeKeeperConnection")));

            builder.Services.AddScoped<IDbOperations, DbOperations>();

            //builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            //builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            //builder.Services.AddIdentityServer()
            //    .AddApiAuthorization<User, ApplicationDbContext>();

            //builder.Services.AddAuthentication()
            //    .AddIdentityServerJwt();

            builder.Services.AddControllersWithViews();
            builder.Services.AddRazorPages();

            builder.Services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(15);

                options.LoginPath = "/Identity/Account/Login";
                options.AccessDeniedPath = "/Identity/Account/AccessDenied";
                options.SlidingExpiration = true;

            });



            builder.Services.AddCors(o =>
            {
                o.AddPolicy(name: "CorsPolicy",
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:44476",
                                              "http://www.contoso.com");
                          policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                      });
            });

            var app = builder.Build();
            app.UseCors();

            //// Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment()) {
            //    app.UseMigrationsEndPoint();
            //} else {
            //    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //    app.UseHsts();
            //}

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            // app.UseCors("CorsPolicy");

            //app.UseAuthentication();
            //app.UseIdentityServer();
            //app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            app.MapRazorPages();

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}