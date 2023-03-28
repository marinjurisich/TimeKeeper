using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Text.Json;
using TimeKeeper.Data;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers {
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkdayController : ControllerBase {

        private readonly DbOperations _operations;

        public WorkdayController(DbOperations operations) {
            _operations = operations;
        }

        [HttpPost]
        public IActionResult ClockInOut() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            Workday workday = JsonSerializer.Deserialize<Workday>(jsonString);


            return _operations.ClockInOut(workday);

        }

        [HttpGet]
        public IActionResult ScannerClockInOut(string guid) {

        }


    }
}
