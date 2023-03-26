﻿using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers 
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class MonthController : ControllerBase {

        private readonly ApplicationDbContext _context;

        public MonthController(ApplicationDbContext context) {
            _context = context;
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
    }
}