
using TimeKeeper.Data;

namespace TimeKeeper.Models {
    public class User {

        private readonly ApplicationDbContext _context;

        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }
        public double payPerHour { get; set; }
        public int companyId { get; set; }
        public double? grade { get; set; }
        public string guid { get; set; }



        //constructor used when serializing from JSON
        public User() { }

        //constructor called when creating a new user
        public User (string firstName, string lastName, string email, bool isAdmin, double payPerHour, int companyId) {

            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.isAdmin = isAdmin;
            this.payPerHour = payPerHour;
            this.companyId = companyId;
            this.grade = 0;
            this.guid = System.Guid.NewGuid().ToString();
            this.GenerateRandomPassword();
        }

        //constructor called when creating a new user
        public User (string firstName, string lastName, string email, string password, bool isAdmin, double payPerHour, int companyId) {

            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.isAdmin = isAdmin;
            this.payPerHour = payPerHour;
            this.companyId = companyId;
            this.grade = 0;
            this.guid = System.Guid.NewGuid().ToString();
            this.GenerateRandomPassword();
        }

        //constructor called when fetching from DB
        public User(int id, string firstName, string lastName, string email, string password, bool isAdmin, double payPerHour, int companyId, double? grade, string guid) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.isAdmin = isAdmin;
            this.payPerHour = payPerHour;
            this.companyId = companyId;
            this.grade = grade;
            this.guid = guid;
        }

        public void GenerateRandomPassword() {

            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++) {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);

            this.password = finalString;
        }

    }
}
