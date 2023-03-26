using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;
using System.Text.Json;

namespace TimeKeeper.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CompanyController : ControllerBase {

    private readonly ApplicationDbContext _context;

    public CompanyController(ApplicationDbContext context) {
        _context = context;
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
        
        try {

            _context.Companies.Add(company);
            _context.SaveChanges();

            return Ok(company);

        }
        catch (Exception ex) {

            return BadRequest(ex.Message);

        }

    }

}

