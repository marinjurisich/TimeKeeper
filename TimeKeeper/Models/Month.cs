using System.Data.SqlTypes;

namespace TimeKeeper.Models {
    public class Month {

        public int id {  get; set; }
        public DateTime date { get; set; }
        public int userId { get;set; }
        public double salary { get; set; }
        public double? grade { get; set; }
        public double workHours { get; set; }
        public double payPerHour { get; set; }


        public Month (int id, DateTime date, int userId, float salary, double? grade, double workHours, double payPerHour) {
            this.id = id;
            this.date = date;
            this.userId = userId;
            this.salary = salary;
            this.grade = grade;
            this.workHours = workHours;
            this.payPerHour = payPerHour;
        }

        public Month(DateTime date, int userId, double salary, double? grade, double workHours, double payPerHour) {
            this.date = date;
            this.userId = userId;
            this.salary = salary;
            this.grade = grade;
            this.workHours = workHours;
            this.payPerHour = payPerHour;
        }

    }
}
