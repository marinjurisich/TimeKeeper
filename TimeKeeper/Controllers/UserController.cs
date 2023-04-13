using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
        private readonly IDbOperations _operations;

        public UserController(ApplicationDbContext context, IDbOperations operations) {
            _context = context;
            _operations = operations;
        }

        /*
         * Accepts user in request body.
         * user MUST contain ALL user data, missing user data WILL BE LOST!!!
         * returns status 200
         */
        [HttpPost]
        public IActionResult ResetPassword() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            User user = JsonSerializer.Deserialize<User>(jsonString);

            return _operations.ResetPassword(user);
        }

        /*
            Accepts email and password in request body
            Returns response with User or Exception message in body
         */
        [HttpPost]
        public IActionResult LoginUser()
        {
            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            LoginDTO loginData = JsonSerializer.Deserialize<LoginDTO>(jsonString);

            return _operations.LoginUser(loginData);
        }

        // Accepts company id, returns all users in company
        [HttpGet("{companyId}")]
        public List<User> GetAllUsers(int companyId)
        {
            List<User> users = _context.Users.Where(u => u.companyId == companyId).ToList();  
            
            return users;
        }

        // Accepts user id, returns User or null
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user = _context.Users.Where(u => u.id.Equals(id)).FirstOrDefault();

            return user;
        }

        /*
         * Accepts User containing at least firstName, lastName, email,
         * isAdmin, payPerHour and companyId
         * MUST contain adminEmail and adminName (mail and firstName + lastName of admin user that is 
         * registering a new employee - if this data is missing, the new employee won't recieve email with
         * their password, and therefore won't be able to login
         * password is randomly generated
         * grade is optional
         * guid will always be randomly generated
         * Returns new User or Exception message
         */
        [HttpPost]
        public IActionResult Register() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;
            JObject json = JObject.Parse(jsonString);

            User user = new User(
                json.GetValue("firstName").ToString(),
                json.GetValue("lastName").ToString(),
                json.GetValue("email").ToString(),
                Boolean.Parse(json.GetValue("isAdmin").ToString()),
                Double.Parse(json.GetValue("payPerHour").ToString()),
                Int32.Parse(json.GetValue("companyId").ToString())
            );

            string adminEmail = json.GetValue("adminEmail").ToString();
            string adminName = json.GetValue("adminName").ToString();

            return _operations.CreateUser(user, adminEmail, adminName);

        }

        [HttpPost]
        public IActionResult RegisterAdmin() {

            using var bodyStream = new StreamReader(Request.Body);
            var jsonString = bodyStream.ReadToEndAsync().Result;

            JObject json = JObject.Parse(jsonString);

            Company company = new Company(
                json.GetValue("name").ToString(),
                json.GetValue("address").ToString()
            );

            User user = new User(
                json.GetValue("firstName").ToString(),
                json.GetValue("lastName").ToString(),
                json.GetValue("email").ToString(),
                json.GetValue("password").ToString(),
                Boolean.Parse(json.GetValue("isAdmin").ToString()),
                Double.Parse(json.GetValue("payPerHour").ToString()),
                0
            );

            RegistrationDTO data = new RegistrationDTO(company, user);

            return _operations.RegisterAdmin(data);

        }

    }
}
