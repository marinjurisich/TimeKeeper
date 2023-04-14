using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers 
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class MonthController : ControllerBase {

        private readonly ApplicationDbContext _context;

        private readonly IDbOperations _operations;

        public MonthController(ApplicationDbContext context, IDbOperations operations) {
            _context = context;
            _operations = operations;
        }

        //Accepts user id and a date, returns a users month with same date or null
        [HttpGet]
        public Month Get(int userId, DateTime date)
        {
            return _context.Months.Where(m => m.userId == userId && m.date.Month == date.Month).FirstOrDefault();
        }

        //Accepts user id, return all months for that user
        [HttpGet]
        public Month GetUsersMonths(int userId) {
            return _context.Months.Where(m => m.userId == userId).FirstOrDefault();
        }

        //Accepts user id, returns last 12 months
        [HttpGet]
        public List<Month> GetLastTwelveMonths(int userId) {
            return _context.Months.Where(m => m.userId == userId).OrderByDescending(m => m.id).Take(12).ToList();
        }

        //Accepts date as a string, returns all days with matching month and year
        [HttpGet]
        public IActionResult GetDays(string date) {

            return _operations.GetAllDaysInAMonth(date);

        }

        [HttpGet]
        public IActionResult Export(int userId) {

            string fileName = "yearlyReport.xlsx";
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            MemoryStream stream = _operations.ExportWorkdays(userId);

            return File(stream, contentType, fileName);
        }
    }
}
