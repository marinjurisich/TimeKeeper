using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;
using System.Text.Json;
using TimeKeeper.Data.DbOperations;

namespace TimeKeeper.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class DataSeedController : ControllerBase {

    private readonly ApplicationDbContext _context;
    private readonly DBDataSeed dataSeed;

    public DataSeedController(ApplicationDbContext context, IDbOperations operations) {
        _context = context;
        dataSeed = new DBDataSeed(operations);
    }

    [HttpGet]
    public IActionResult Companies(int count) {
        
        var companies = dataSeed.SeedCompany(count);
        return new JsonResult(companies);
    }

    [HttpGet]
    public IActionResult Projects(int count, int company_id) {
        
        var projects = dataSeed.SeedProject(count, company_id);
        return new JsonResult(projects);
    }

    [HttpGet]
    public IActionResult AdminUsers(int count, int company_id)
    {
        var users = dataSeed.SeedUser(count, company_id, is_admin: true, pay_per_hour: 150);
        return new JsonResult(users);
    }

    [HttpGet]
    public IActionResult Users(int count, int company_id)
    {
        var users = dataSeed.SeedUser(count, company_id, is_admin: false);
        return new JsonResult(users);
    }

    [HttpGet]
    public IActionResult Workdays(int user_id, int project_id, string date_start_iso, string date_end_iso)
    {
        DateTime start = DateTime.ParseExact(date_start_iso, "yyyy-MM-dd", null);
        DateTime end = DateTime.ParseExact(date_end_iso, "yyyy-MM-dd", null);

        var workdays = dataSeed.SeedWorkday(user_id, project_id, start, end);
        return new JsonResult(workdays);
    }

}

