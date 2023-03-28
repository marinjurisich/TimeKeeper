using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;
using System.Text.Json;
using TimeKeeper.Data.DbOperations;

namespace TimeKeeper.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CompanyController : ControllerBase {

    private readonly ApplicationDbContext _context;
    private readonly DbOperations _operations;

    public CompanyController(ApplicationDbContext context, DbOperations operations) {
        _context = context;
        _operations = operations;
    }

    [HttpGet("{id}")]
    public Company Get(int id) {
        return _context.Companies.Where(c => c.id == id).FirstOrDefault();
    }

    [HttpPost]
    public IActionResult Register() {

        using var bodyStream = new StreamReader(Request.Body);
        var jsonString = bodyStream.ReadToEndAsync().Result;

        Company company = JsonSerializer.Deserialize<Company>(jsonString);
        
        return _operations.RegisterCompany(company);

    }

}

