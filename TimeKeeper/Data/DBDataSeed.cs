
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Data
{

    public class DBDataSeed
    {

        private readonly IDbOperations _operations;

        private Random random = new Random();

        public DBDataSeed(IDbOperations operations) {
            _operations = operations;
        }

        /// <summary>
        /// Generate companies, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Company[] SeedCompany(int count, string name_prefix = "Random d.o.o", string address_prefix = "Random street")
        {
            Company[] companies = new int[count]
                .Select((_, idx) => new Company ($"{name_prefix} {idx+1}", $"{address_prefix} {idx+1}"))
                .ToArray();
            
            _operations.CompanyAdd(companies);
            return companies;
        }

        /// <summary>
        /// Generate projects, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Project[] SeedProject(int count, int company_id, string name_prefix = "Random project", string description_prefix = "Random project description")
        {
            Project[] projects = new int[count]
                .Select((_, idx) => new Project (
                    $"{name_prefix} {idx + 1}",
                    $"{description_prefix} {idx + 1}",
                    company_id
                ))
                .ToArray();
            
            _operations.ProjectAdd(projects);
            return projects;
        }

        /// <summary>
        /// Generate users, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public User[] SeedUser(
            int count,
            int company_id,
            bool is_admin,
            double? pay_per_hour = null,
            string first_name_prefix = "John",
            string last_name_prefix = "Doe",
            string email_prefix = "john.doe")
        {
            if (pay_per_hour == null) {
                pay_per_hour = 50 + random.Next(50);
            }

            User[] users = new int[count]
                .Select((_, idx) => new User(
                    $"{first_name_prefix} {idx + 1}",
                    $"{last_name_prefix} {idx + 1}",
                    $"{email_prefix}_{idx + 1}@mail.com",
                    password: $"{email_prefix}_{idx + 1}",
                    is_admin,
                    (double) pay_per_hour,
                    company_id
                ))
                .ToArray();

            for (int i = 0; i < users.Length; ++i) {
                _operations.CreateUser(users[i]);
            }
            return users;
        }

        /// <summary>
        /// Generate workdays and months, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Workday[] SeedWorkday(int user_id, int project_id, DateTime start_d, DateTime end_d)
        {
            var user = _operations.GetUser(user_id);
            if (user == null) {
                throw new Exception($"User with ID {user_id} not found");
            }

            int days_count = (int)(end_d - start_d).TotalDays;
            List<Workday> workdays = new List<Workday>(days_count);

            // Iterate from start to end date (only allow generating days that have already passed)
            for (var d = start_d; d.Date <= end_d.Date && d.Date < DateTime.Now.Date; d = d.AddDays(1))
            {
                // Do not seed weekends
                if (d.DayOfWeek == DayOfWeek.Sunday || d.DayOfWeek == DayOfWeek.Saturday)
                {
                    continue;
                }

                // Prepare workday clcockin and clock out
                DateTime clockIn = new DateTime(d.Year, d.Month, d.Day, 8, 50, 0).AddMinutes(random.Next(10));
                DateTime clockOut = new DateTime(d.Year, d.Month, d.Day, 17, 0, 0).AddMinutes(random.Next(10));
                string date_iso = d.ToString("yyyy-MM-dd");

                // Randomize - in cca 25% of cases, set 0-2h less work hours
                if (d.Day < 8)
                {
                    clockOut.AddHours(-(d.Day % 3));
                }

                // Generate workday
                Workday wd = new Workday(
                    userId: user.id,
                    date: d,
                    projectId: project_id,
                    clockIn: clockIn,
                    clockOut: clockOut,
                    workHours: (clockOut - clockIn).TotalHours,
                    description: $"Day {date_iso}:\n - This is an auto-generated description for project ID {project_id}.",
                    grade: 1.0 * (d.Day % 5),
                    attachment: null
                );

                // Save to list
                workdays.Add(wd);
            }

            // Update workdays in DB
            var workdaysArr = workdays.ToArray();
            _operations.WorkdayAdd(workdaysArr);

            // Return array
            return workdaysArr;
        }

    }
}