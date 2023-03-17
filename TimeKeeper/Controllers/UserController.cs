using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TimeKeeper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        [HttpGet]
        public string GetUsername(string userId)
        {
            return $"some_name_{userId}";
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
