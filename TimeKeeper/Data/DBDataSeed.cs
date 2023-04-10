
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Models;

namespace TimeKeeper.Data
{

    public class DBDataSeed
    {

        private readonly IDbOperations _operations;

        public DBDataSeed(IDbOperations operations) {
            _operations = operations;
        }

        /// <summary>
        /// Generate companies, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Company[] SeedCompany(int count, string namePrefix = "Random d.o.o", string addressPrefix = "Random street")
        {
            Company[] companies = new int[count]
                .Select((_, idx) => new Company ($"{namePrefix} {idx+1}", $"{addressPrefix} {idx+1}"))
                .ToArray();
            
            _operations.CompanyAdd(companies);
            return companies;
        }

        /// <summary>
        /// Generate projects, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Project[] SeedProject(int count, int company_id, string namePrefix = "Random project", string descriptionPrefix = "Random project description")
        {
            Project[] projects = new int[count]
                .Select((_, idx) => new Project (
                    $"{namePrefix} {idx + 1}",
                    $"{descriptionPrefix} {idx + 1}",
                    company_id
                ))
                .ToArray();
            
            _operations.ProjectAdd(projects);
            return projects;
        }

        /// <summary>
        /// Generate users, insert them to DB and return them. On return, they are filled with IDs.
        /// </summary>
        public Project[] SeedUser(int count, int company_id, string namePrefix = "Random project", string descriptionPrefix = "Random project description")
        {
            Project[] projects = new int[count]
                .Select((_, idx) => new Project (
                    $"{namePrefix} {idx + 1}",
                    $"{descriptionPrefix} {idx + 1}",
                    company_id
                ))
                .ToArray();
            
            _operations.ProjectAdd(projects);
            return projects;
        }

    }
}