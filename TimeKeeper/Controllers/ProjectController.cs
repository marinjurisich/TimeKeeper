using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using TimeKeeper.Data;
using TimeKeeper.Models;

namespace TimeKeeper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ProjectController (ApplicationDbContext context) {
            _context = context;
        }

        //Accepts company id, returns all company's projects
        [HttpGet]
        public List<Project> GetCompanyProjects(int companyId)
        {
            List<Project> projects = _context.Projects.Where(u => u.companyId == companyId).ToList();  
            return projects;
        }


    }
}
