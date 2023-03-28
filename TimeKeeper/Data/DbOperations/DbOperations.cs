using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TimeKeeper.Models;

namespace TimeKeeper.Data.DbOperations {

    public class DbOperations : IDbOperations {

        private readonly ApplicationDbContext _context;

        public DbOperations(ApplicationDbContext context) {
            _context = context;
        }

        #region Workday

        public IActionResult ClockInOut(Workday workday) {

            try {

                var days = _context.Workdays.Where(w => w.Equals(workday));

                if (days == null) {
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

                //calculateMonthlyHours();

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
                    }).Where(x => x.guid == guid);

                var userId = _context.Users.Where(u => u.guid == guid).Select(u => u.id).FirstOrDefault();

                if (days == null) {

                    //clockIn if no record for this day

                    if (userId != null) {

                        Workday workday = new Workday {
                            userId = userId,
                            date = new DateTime(),
                            clockIn = new DateTime()
                        };

                        _context.Workdays.Add(workday);
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

                //calculateMonthlyHours();

                return statusResponse(200);

            } catch (Exception ex) {

                return statusResponse(500, ex.Message);

            }
        }
        #endregion

        #region User
        public IActionResult CreateUser(User user) {

            try {

                user.guid = Guid.NewGuid().ToString();
                user.GenerateRandomPassword();

                _context.Users.Add(user);
                _context.SaveChanges();

                ValidateUser(user);

                return statusResponse(200, user);

            } catch (Exception ex) {

                return statusResponse(500,ex.Message);

            }

        }

        public void ValidateUser(User user) {
            
            if(String.IsNullOrWhiteSpace(user.firstName)  || String.IsNullOrWhiteSpace(user.lastName)
                || String.IsNullOrWhiteSpace(user.email) || String.IsNullOrWhiteSpace(user.password)
                || user.isAdmin == null || user.payPerHour == null || user.payPerHour == 0
                || user.companyId == null || user.companyId == 0 || String.IsNullOrWhiteSpace(user.guid))
            {
                throw new Exception("Missing user data!");
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

        #endregion

        #region Helpers
        public ObjectResult statusResponse (int status, object? obj=null) {
            var result = new ObjectResult(obj);
            result.StatusCode = status;
            return result;
        }
        #endregion
    }
}
