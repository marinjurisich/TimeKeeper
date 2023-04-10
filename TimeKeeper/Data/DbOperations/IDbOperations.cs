using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Models;

namespace TimeKeeper.Data.DbOperations {
    public interface IDbOperations {

        IActionResult ClockInOut(Workday workday);
        IActionResult GetWorkday(string dateAsString);
        IActionResult ListWorkdays(int user_id, DateTime start, DateTime end);
        IActionResult UpdateWorkday(Workday workday);
        IActionResult GetAllDaysInAMonth(string dateAsString);
        void WorkdayAdd(params Workday[] workdays);
        IActionResult ScannerClockInOut(string guid);
        public User? GetUser(int user_id);
        IActionResult CreateUser(User user);
        IActionResult LoginUser(LoginDTO loginData);
        void ValidateUser(User user);
        IActionResult RegisterCompany(Company company);
        public void CompanyAdd(params Company[] companies);
        public void ProjectAdd(params Project[] projects);
        IActionResult CreateMonth(int userId);
        void CreateMonth(int userId, DateTime month);
        ObjectResult statusResponse(int status, object? obj = null);
        string ValidatePassword(string password, byte[] salt);
        string HashPasword(string password, out byte[] salt);
    }
}
