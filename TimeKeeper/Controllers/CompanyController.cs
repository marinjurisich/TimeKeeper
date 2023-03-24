using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CompanyController : ControllerBase {

    private readonly ApplicationDbContext _context;

    public CompanyController(ApplicationDbContext context) {
        _context = context;
    }

    [HttpGet("{id")]
    public Company Get(int id) {
        return _context.Companies.Where(c => c.id == id).FirstOrDefault();
    }

}

