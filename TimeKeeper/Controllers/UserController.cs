using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
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
        public User LoginUser(string email, string password)
        {
            //Demo login, treba bolji način za lozinku slati, vjj ce ici preko POST poziva
            return _context.Users.Where(u => u.email.Equals(email) && u.password.Equals(password)).FirstOrDefault();
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
