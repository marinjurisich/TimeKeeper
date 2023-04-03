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

        private readonly IDbOperations _operations;

        public WorkdayController(IDbOperations operations) {
            _operations = operations;
        }

        //Accepts datetime as a string, returns a single Workday or null
        //TODO: should return Workday list in case there are multiple inputs in a single day
        [HttpGet]
        public IActionResult Get(string date) {

            return _operations.GetWorkday(date);
        }

        /*
         * Accepts Workday with all neccessary data, updates it and saves to DB
         * returns statusRespnose 200
         */
        [HttpPost]
        public IActionResult Update() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            Workday workday = JsonSerializer.Deserialize<Workday>(jsonString);

            return _operations.UpdateWorkday(workday);

        }

        /*Accepts a workday with:
         * userId, date, clockIn - when clocking in
         * The rest of Workday attributes (all attributes) - when clocking out
         * Returns status response 200
         */
        [HttpPost]
        public IActionResult ClockInOut() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            Workday workday = JsonSerializer.Deserialize<Workday>(jsonString);


            return _operations.ClockInOut(workday);

        }
        
        //Accepts guid as string, returns staus response 200
        [HttpGet]
        public IActionResult ScannerClockInOut(string guid) {

            return _operations.ScannerClockInOut(guid);

        }


    }
}
