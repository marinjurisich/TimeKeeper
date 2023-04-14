using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Models;

namespace TimeKeeper.Data.DbOperations {
    public interface IDbOperations {

        MemoryStream ExportWorkdays(int userId);
        IActionResult ClockInOut(Workday workday);
        IActionResult GetWorkday(string dateAsString);
        IActionResult ListWorkdays(int userId, DateTime start, DateTime end);
        IActionResult UpdateWorkday(Workday workday);
        IActionResult GetAllDaysInAMonth(string dateAsString);
        void WorkdayAdd(params Workday[] workdays);
        IActionResult ScannerClockInOut(string guid);
        public User? GetUser(int userId);
        IActionResult CreateUser(User user, string? adminEmail = null, string? adminName = null);
        IActionResult RegisterAdmin(RegistrationDTO data);
        IActionResult LoginUser(LoginDTO loginData);
        void ValidateUser(User user);
        Company RegisterCompany(Company company);
        public void CompanyAdd(params Company[] companies);
        public void ProjectAdd(params Project[] projects);
        IActionResult CreateMonth(int userId, DateTime? month);
        IActionResult ResetPassword(User user);
        void SendPasswordResetMail(User user);
        void sendPasswordViaEmail(User user, string adminEmail, string adminName);
        ObjectResult statusResponse(int status, object? obj = null);
        string ValidatePassword(string password, byte[] salt);
        string HashPasword(string password, out byte[] salt);
    }
}
