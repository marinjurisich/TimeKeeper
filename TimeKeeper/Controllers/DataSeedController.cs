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
    private readonly IDbOperations _operations;
    private readonly DBDataSeed dataSeed;

    public DataSeedController(ApplicationDbContext context, IDbOperations operations) {
        _context = context;
        _operations = operations;
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

}

