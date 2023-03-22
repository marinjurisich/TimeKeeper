using Microsoft.AspNetCore.Mvc;
using TimeKeeper.Data;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet]
        public string GetUsername(string userId)
        {
            return $"some_name_{userId}";
        }

        // GET: api/<UserController>
        [HttpGet]
        public User Get()
        {
            var users = _context.Users.FirstOrDefault();
            var company = _context.Companies.FirstOrDefault();
            var month = _context.Months.FirstOrDefault();
            var project = _context.Projects.FirstOrDefault();
            var day = _context.Workdays.FirstOrDefault();
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public string Post([FromBody] string value)
        {
            return $"You've sent \"{value}\"";
        }

        [HttpPost]
        public string AnotherPost()
        {
            using var bodyStream = new StreamReader(Request.Body);
            var bodyText = bodyStream.ReadToEndAsync().Result;

            return "You've sent this body:\n" + bodyText;
        }

    }
}
