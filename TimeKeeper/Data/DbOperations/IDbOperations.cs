using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Models;

namespace TimeKeeper.Data.DbOperations {
    public interface IDbOperations {

        IActionResult ClockInOut(Workday workday);
        IActionResult GetWorkday(string dateAsString);
        IActionResult UpdateWorkday(Workday workday);
        IActionResult GetAllDaysInAMonth(string dateAsString);
        IActionResult ScannerClockInOut(string guid);
        IActionResult CreateUser(User user);
        IActionResult RegisterAdmin(RegistrationDTO data);
        IActionResult LoginUser(LoginDTO loginData);
        void ValidateUser(User user);
        Company RegisterCompany(Company company);
        IActionResult CreateMonth(int userId);
        ObjectResult statusResponse(int status, object? obj = null);
        string ValidatePassword(string password, byte[] salt);
        string HashPasword(string password, out byte[] salt);
    }
}
