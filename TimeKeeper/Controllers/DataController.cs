using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class DataController : ControllerBase
{

    private readonly ApplicationDbContext _context;
    private readonly IDbOperations _operations;

    public DataController(ApplicationDbContext context, IDbOperations operations)
    {
        _context = context;
        _operations = operations;
    }


    /// <summary>
    /// Function that generates data. Takes cca 1-2 minutes to execute.
    /// </summary>
    /// <param name="companies">How many companies to create.</param>
    /// <param name="projectsPerCompany">How many project does each company contain.</param>
    /// <param name="adminsPerCompany">How many admins will each company have.</param>
    /// <param name="usersPerCompany">How many non-admin users will each company contain.</param>
    /// <param name="months">How long in past to generate workdays.</param>
    [HttpGet]
    public IActionResult GenerateData(
        int companiesCount = 10,
        int projectsPerCompany = 5,
        int adminsPerCompany = 2,
        int usersPerCompany = 10,
        int monthsCount = 12
        )
    {
        // Init some variables
        Random random = new Random();
        int idPadding = 10;  // Add padding to avoid conflicts with first 10 companies
        int userCount = companiesCount * (adminsPerCompany + usersPerCompany);

        #region Generate companies

        List<Company> companies = new List<int>(new int[companiesCount])
            .Select((_, idx) => new Company(
                id: idx + idPadding,
                name: $"Company {idx + 2}",
                address: $"Ilica {idx + 2}, 10 000 Zagreb"
            )).ToList();

        #endregion

        // Containers later generation
        List<Project> projects = new List<Project>(companiesCount * projectsPerCompany);
        List<User> users = new List<User>(userCount);
        List<UserSalt> userSalts = new List<UserSalt>(userCount);

        // Some helper variables
        int adminCounter = 0;
        int userCounter = 0;


        #region For each company

        for (int companyIdx = 0; companyIdx < companies.Count; ++companyIdx)
        {
            // Initialize
            Company company = companies[companyIdx];

            #region Generate projects

            for (int i = 0; i < projectsPerCompany; ++i)
            {
                projects.Add(new Project(
                    name: $"Project {projects.Count + 1}",
                    description: $"This is an auto-generated project for company \"{company.name}\"",
                    companyId: company.id
                ));
            }

            #endregion


            #region Generate admin users

            for (int adminIdx = 0; adminIdx < adminsPerCompany; ++adminIdx)
            {
                int userId = users.Count + 1 + idPadding;
                ++adminCounter;

                byte[] adminSalt;
                User adminUser = new User(
                    id: userId,
                    firstName: "Admin",
                    lastName: $"Comp {adminCounter}",
                    email: $"admin_{adminCounter}@mail.com",
                    password: HashPassword($"pass_{adminCounter}", out adminSalt),
                    isAdmin: true,
                    payPerHour: 50,
                    companyId: company.id,
                    grade: 5,
                    guid: Guid.NewGuid().ToString()
                    );
                users.Add(adminUser);
                userSalts.Add(new UserSalt(adminUser.email, adminSalt));
            }

            #endregion


            #region Generate regular users

            for (int j = 0; j < usersPerCompany; ++j)
            {
                int userId = users.Count + 1 + idPadding;
                ++userCounter;

                byte[] tempSalt;
                User tempUser = new User(
                    id: userId,
                    firstName: $"John {userCounter}",
                    lastName: $"Doe {userCounter}",
                    email: $"user_{userCounter}@mail.com",
                    password: HashPassword($"pass_{userCounter}", out tempSalt),
                    isAdmin: false,
                    payPerHour: 30 + random.Next(0, 20),
                    companyId: company.id,
                    grade: random.NextDouble() * 5.0,
                    guid: Guid.NewGuid().ToString()
                    );
                users.Add(tempUser);
                userSalts.Add(new UserSalt(tempUser.email, tempSalt));
            }

            #endregion
        }

        #endregion


        // Generate months and workdays
        List<Month> months = new List<Month>(users.Count * monthsCount);
        List<Workday> workdays = new List<Workday>(months.Capacity * 30);


        #region For each user

        for (int userIdx = 0; userIdx < users.Count; ++userIdx)
        {
            User user = users[userIdx];
            Project project = projects.Where(proj => proj.companyId == user.companyId).First();

            #region Iterate months

            for (int monthIdx = 0; monthIdx < monthsCount; ++monthIdx)
            {
                DateTime startDay = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-monthIdx);
                List<Workday> tempWorkdays = new List<Workday>(30);

                #region Generate workdays

                // For each day, from start to end (if current month, then stop at today's date)
                for (DateTime d = startDay; d.Month == startDay.Month && d.Date < DateTime.Now.Date; d = d.AddDays(1))
                {
                    int workdayId = workdays.Count + 1 + idPadding;
                    DateTime clockIn = new DateTime(d.Year, d.Month, d.Day, 8, 50, 0).AddMinutes(random.Next(10));
                    DateTime clockOut = new DateTime(d.Year, d.Month, d.Day, 17, 0, 0).AddMinutes(random.Next(10));

                    // In cca 25% of cases, set 0-2h less work hours
                    if (d.Day < 8)
                    {
                        clockOut.AddHours(-(d.Day % 3));
                    }

                    Workday wd = new Workday(
                        id: workdayId,
                        userId: user.id,
                        date: d,
                        projectId: project.id,
                        clockIn: clockIn,
                        clockOut: clockOut,
                        workHours: (clockOut - clockIn).TotalHours,
                        description: $"This is an auto-generated description for project ID {project.id}",
                        grade: 1.0 * (d.Day % 5),
                        attachment: null
                    );
                }

                // After generating workdays, extend the original list
                workdays.AddRange(tempWorkdays);

                #endregion


                #region Generate month summary

                int monthId = months.Count + 1 + idPadding;
                Month month = new Month(
                    id: monthId++,
                    date: startDay,
                    userId: user.id,
                    salary: (float)(tempWorkdays.Sum(workday => workday.workHours * user.payPerHour) ?? 0.0),
                    grade: (float)(tempWorkdays.Average(workday => workday.grade) ?? 0.0),
                    workHours: (float)(tempWorkdays.Sum(workday => workday.workHours) ?? 0.0),
                    payPerHour: user.payPerHour
                    );

                #endregion
            }

            #endregion
        }

        #endregion

        return new Microsoft.AspNetCore.Mvc.JsonResult(new
        {
            companies=companies,
            projects=projects,
            users=users,
            userSalts=userSalts,
            months=months,
            workdays=workdays
        });
    }

    private string HashPassword(string password, out byte[] salt)
    {
        int keySize = 64;
        salt = System.Security.Cryptography.RandomNumberGenerator.GetBytes(keySize);

        var hash = System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2(
            System.Text.Encoding.UTF8.GetBytes(password),
            salt,
            iterations: 350000,
            System.Security.Cryptography.HashAlgorithmName.SHA512,
            keySize);

        return Convert.ToHexString(hash);
    }

}

