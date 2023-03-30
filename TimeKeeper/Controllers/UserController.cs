using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using System.Text.Json;
using TimeKeeper.Data;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly DbOperations _operations;

        public UserController(ApplicationDbContext context, DbOperations operations) {
            _context = context;
            _operations = operations;
        }

        [HttpGet]
        public IActionResult LoginUser(string email, string password)
        {
            return _operations.LoginUser(email, password);
        }

        // GET: api/<UserController>
        [HttpGet("{companyId}")]
        public List<User> GetAllUsers(int companyId)
        {
            List<User> users = _context.Users.Where(u => u.companyId == companyId).ToList();  
            
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user = _context.Users.Where(u => u.id.Equals(id)).FirstOrDefault();

            return user;
        }

        [HttpPost]
        public IActionResult Register() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            User user = JsonSerializer.Deserialize<User>(jsonString);

            return _operations.CreateUser(user);

        }

    }
}
