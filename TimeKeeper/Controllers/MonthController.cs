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

        [HttpGet]
        public Month Get(int userId, DateTime date)
        {
            return _context.Months.Where(m => m.userId == userId && m.date.Month == date.Month).FirstOrDefault();
        }

        [HttpGet]
        public Month GetUsersMonths(int userId) {
            return _context.Months.Where(m => m.userId == userId).FirstOrDefault();
        }

        [HttpGet]
        public List<Month> GetLastTwelveMonths(int userId) {
            return _context.Months.Where(m => m.userId == userId).TakeLast(12).ToList();
        }

        [HttpGet]
        public IActionResult GetDays(string date) {

            return _operations.GetAllDaysInAMonth(date);

        }
    }
}
