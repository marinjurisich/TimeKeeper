using Microsoft.AspNetCore.Routing.Constraints;

namespace TimeKeeper.Models {
    public class Workday {

        public int id { get;set; }
        public int userId { get;set; }
        public DateTime date { get;set; }
        public int projectId { get;set; }
        public DateTime clockIn { get;set; }
        public DateTime clockOut { get;set; }
        public double workHours { get;set; }
        public string? description { get;set; }
        public double? grade { get;set; }
        public string? attachment { get;set; }

        public Workday (int id, int userId, DateTime date, int projectId, DateTime clockIn, DateTime clockOut, double workHours, string description, double? grade, string? attachment) {
            this.id = id;
            this.userId = userId;
            this.date = date;
            this.projectId = projectId;
            this.clockIn = clockIn;
            this.clockOut = clockOut;
            this.workHours = workHours;
            this.description = description;
            this.grade = grade;
            this.attachment = attachment;
        }

        public Workday(int userId, DateTime date, int projectId, DateTime clockIn, DateTime clockOut, double workHours, string description, double? grade, string? attachment) {
            this.userId = userId;
            this.date = date;
            this.projectId = projectId;
            this.clockIn = clockIn;
            this.clockOut = clockOut;
            this.workHours = workHours;
            this.description = description;
            this.grade = grade;
            this.attachment = attachment;
        }


    }
}
