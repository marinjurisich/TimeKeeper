using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using TimeKeeper.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TimeKeeper.Data.DbOperations {

    public class DbOperations : IDbOperations {

        private readonly ApplicationDbContext? _context;
        public byte[]? salt;
        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public DbOperations(ApplicationDbContext context) {
            _context = context;
        }

        public DbOperations() { }

        #region Workday

        public IActionResult GetWorkday(string dateAsString) {

            DateTime dateTime = DateTime.Parse(dateAsString);

            Workday workday = _context.Workdays.Where(w => w.date.Equals(dateTime)).FirstOrDefault();

            return statusResponse(200, workday);
        }

        public IActionResult ListWorkdays(int userId, DateTime start, DateTime end)
        {
            Workday[] workdays = new Workday[] { };

            if (_context != null)
            {
                workdays = _context.Workdays.Where(workday =>
                    workday.userId == userId
                    && workday.date.Date >= start.Date
                    && workday.date.Date <= end.Date
                ).ToArray();
            }
            return statusResponse(200, workdays);
        }

        public IActionResult UpdateWorkday(Workday workday) {

            DateTime temp = (DateTime) workday.clockOut;
            workday.workHours = temp.Subtract((DateTime) workday.clockIn).TotalHours;

            _context.Workdays.Update(workday);
            _context.SaveChanges();

            CalculateMonthlySalary(workday);

            return statusResponse(200);
        }

        public IActionResult GetAllDaysInAMonth(string dateAsString) {

            DateTime dateTime = DateTime.Parse(dateAsString);

            List<Workday> days = _context.Workdays.Where(w => w.date.Month == dateTime.Month && w.date.Year == dateTime.Year).ToList();

            return statusResponse(200, days);
        }

        public void WorkdayAdd(params Workday[] workdays)
        {
            if (_context != null)
            {
                // Calculate months stats
                var months = new Dictionary<(int, int, int), Workday>();

                // Iterate days
                for (int i = 0; i < workdays.Length; ++i)
                {
                    // Add to DB
                    _context.Workdays.Add(workdays[i]);

                    // Save month
                    var key = (workdays[i].userId, workdays[i].date.Year, workdays[i].date.Month);
                    months[key] = workdays[i];
                }
                _context.SaveChanges();

                // Update months' statistics
                foreach(var month_workday in months)
                {
                    // Extract data
                    Workday wd = month_workday.Value;

                    // Create month if it does not exist
                    Month? month = _context.Months.Where(m =>
                        m.userId == wd.userId
                        && m.date.Month == wd.date.Month
                        && m.date.Year == wd.date.Year
                    ).FirstOrDefault();

                    if (month == null)
                    {
                        CreateMonth(wd.userId, wd.date);
                    }

                    // Calculate month statistics
                    CalculateMonthlySalary(wd);
                }
            }
        }

        public IActionResult ClockInOut(Workday workday) {

            try {

                var days = _context.Workdays.Where(w => w.Equals(workday));

                if (days == null) {

                    //check if month exists, if not, create it
                    if (_context.Months.Where(m => m.date.Month == workday.date.Month
                    && m.date.Year == workday.date.Year).FirstOrDefault() == null) {
                        CreateMonth(workday.userId);
                    }

                    //clockIn if no record for this day
                    _context.Workdays.Add(workday);

                } else {

                    Workday day = days.Last();

                    if (day.clockOut == null) {
                        //clockOut if exists a record without clockOut time
                        day.clockOut = workday.clockOut;
                        DateTime temp = (DateTime) day.clockOut;
                        day.workHours = temp.Subtract((DateTime) day.clockIn).TotalHours;
                        day.description = workday.description;
                        day.projectId = workday.projectId;
                        day.grade = workday.grade;
                        day.attachment = workday.attachment;

                        _context.Update(day);

                    } else {
                        //clockIn again if the last workday has clocked out
                        _context.Workdays.Add(workday);
                    }


                }

                _context.SaveChanges();

                CalculateMonthlySalary(workday);

                return statusResponse(200);

            } catch (Exception ex) {

                return statusResponse(500,ex.Message);

            }
        }

        public IActionResult ScannerClockInOut(string guid) {
            try {

                var days = _context.Workdays.Join(_context.Users,
                    w => w.userId,
                    u=> u.id,
                    (w,u) => new {
                        workday = w,
                        guid = u.guid
                    }).Where(x => x.guid == guid && x.workday.date.Equals(new DateTime()));

                var userId = _context.Users.Where(u => u.guid == guid).Select(u => u.id).FirstOrDefault();


                if (days == null) {

                    //clockIn if no record for this day

                    if (userId != null) {

                        Workday workday = new Workday {
                            userId = userId,
                            date = new DateTime(),
                            clockIn = new DateTime()
                        };

                        //check if month exists, if not, create it
                        if (_context.Months.Where(m => m.date.Month == workday.date.Month
                        && m.date.Year == workday.date.Year).FirstOrDefault() == null) {
                            CreateMonth(userId);
                        }
                        _context.Workdays.Add(workday);

                    } else {
                        throw new Exception("Missing user guid");
                    }

                } else {

                    var day = days.Last();

                    if (day.workday.clockOut == null) {
                        //clockOut if exists a record without clockOut time
                        day.workday.clockOut = new DateTime();
                        DateTime temp = (DateTime) day.workday.clockOut;
                        day.workday.workHours = temp.Subtract((DateTime) day.workday.clockIn).TotalHours;


                        _context.Update(day.workday);

                    } else {
                        //clockIn again if the last workday has clocked out

                        Workday workday = new Workday {
                            userId = userId,
                            date = new DateTime(),
                            clockIn = new DateTime()
                        };
                        _context.Workdays.Add(day.workday);
                    }


                }

                _context.SaveChanges();

                CalculateMonthlySalary(days.Last().workday);

                return statusResponse(200);

            } catch (Exception ex) {

                return statusResponse(500, ex.Message);

            }
        }
        #endregion

        #region User

        public User? GetUser(int userId) {
            if (_context != null) {
                var user = _context.Users.Single(user => user.id == userId);
                return user;
            }
            return null;
        }

        public IActionResult CreateUser(User user) {

            try {

                user.guid = Guid.NewGuid().ToString();
                if(String.IsNullOrWhiteSpace(user.password)) {
                    user.GenerateRandomPassword();
                }

                ValidateUser(user);

                string hashedPassword = HashPasword(user.password, out salt);
                user.password = hashedPassword;

                UserSalt s = new UserSalt(user.email, salt);

                _context.UserSalts.Add(s);
                _context.Users.Add(user);
                _context.SaveChanges();

                return statusResponse(200, user);

            } catch (Exception ex) {

                return statusResponse(500, ex.Message);

            }

        }

        public IActionResult LoginUser(LoginDTO loginData) {
            try {

                salt = _context.UserSalts.Where(s => s.email.Equals(loginData.email))
                        .Select(s => s.salt).First();

                string hashedPassword = ValidatePassword(loginData.password, salt);

                User user = _context.Users.Where(u => u.email.Equals(loginData.email) && u.password.Equals(hashedPassword)).FirstOrDefault();

                if (user != null) {
                    return statusResponse(200, user);
                } else {
                    return statusResponse(500, "Wrong email or password!");
                }


            } catch (Exception ex) {

                return statusResponse(500, ex.Message);

            }
        }

        public void ValidateUser(User user) {
            
            if(String.IsNullOrWhiteSpace(user.firstName) ||
                String.IsNullOrWhiteSpace(user.lastName) ||
                String.IsNullOrWhiteSpace(user.email) ||
                String.IsNullOrWhiteSpace(user.password) ||
                user.isAdmin == null ||
                user.payPerHour == null ||
                user.payPerHour == 0 ||
                user.companyId == null ||
                user.companyId == 0 ||
                String.IsNullOrWhiteSpace(user.guid))
            {
                throw new Exception("Missing user data!");
            }

            if(_context.Users.Any(u => u.email.Equals(user.email))){
                throw new Exception("User with this email already exists!");
            }

        }
        #endregion

        #region Company

        public IActionResult RegisterCompany(Company company) {
            try {

                _context.Companies.Add(company);
                _context.SaveChanges();

                return statusResponse(200, company);

            } catch (Exception ex) {

                return statusResponse(500,ex.Message);

            }
        }

        public void CompanyAdd(params Company[] companies) {
            if (_context != null) {
                for (int i = 0; i < companies.Length; ++i) {
                    _context.Companies.Add(companies[i]);
                }
                _context.SaveChanges();
            }
        }

        #endregion

        #region Projects

        public void ProjectAdd(params Project[] projects) {
            if (_context != null) {
                for (int i = 0; i < projects.Length; ++i) {
                    _context.Projects.Add(projects[i]);
                }
                _context.SaveChanges();
            }
        }

        #endregion

        #region Month

        public IActionResult CreateMonth(int userId, DateTime? month = null) {

            if (month == null)
            {
                month = DateTime.Now;
            }

            if (month.Value.Day > 1)
            {
                month.Value.AddDays(-(month.Value.Day - 1));
            }

            double payPerHour = _context.Users.Where(u => u.id == userId).Select(u => u.payPerHour).First();

            Month monthDb = new Month(month.Value, userId, 0, null, 0, payPerHour);

            _context.Months.Add(monthDb);
            _context.SaveChanges();
            return statusResponse(200);
        }

        public void CalculateMonthlySalary(Workday day) {

            Month month = _context.Months.Where(m => m.userId == day.userId
            && m.date.Month == day.date.Month && m.date.Year == day.date.Year).FirstOrDefault();

            if(month == null) {
                throw new Exception("Month does not exist!");
            }

            List<Workday> workdays = _context.Workdays.Where(w => w.userId == day.userId
            && w.date.Month == day.date.Month && w.date.Year == day.date.Year).ToList();

            double monthlyWorkHours = 0;
            foreach (Workday workday in workdays) {
                monthlyWorkHours += (double) workday.workHours;
            }

            month.workHours = monthlyWorkHours;
            month.salary = month.workHours * month.payPerHour;

            _context.Update(month);
            _context.SaveChanges();

        }

        #endregion

        #region Helpers
        public ObjectResult statusResponse (int status, object? obj=null) {
            var result = new ObjectResult(obj);
            result.StatusCode = status;
            return result;
        }

        public string ValidatePassword(string password, byte[] salt) {

            try {

                var hash = Rfc2898DeriveBytes.Pbkdf2(
                    Encoding.UTF8.GetBytes(password),
                    salt,
                    iterations,
                    hashAlgorithm,
                    keySize);

                return Convert.ToHexString(hash);

            } catch (Exception ex) {
                salt = null;
                return ex.Message;
            }

        }

        public string HashPasword(string password, out byte[] salt) {

            try {
                salt = RandomNumberGenerator.GetBytes(keySize);

                var hash = Rfc2898DeriveBytes.Pbkdf2(
                    Encoding.UTF8.GetBytes(password),
                    salt,
                    iterations,
                    hashAlgorithm,
                    keySize);

                return Convert.ToHexString(hash);

            } catch (Exception ex) {
                salt = null;
                return ex.Message;
            }
        }

        #endregion
    }
}
