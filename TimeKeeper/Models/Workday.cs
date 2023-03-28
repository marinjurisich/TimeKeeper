using Microsoft.AspNetCore.Routing.Constraints;

namespace TimeKeeper.Models {
    public class Workday {

        public int id { get;set; }
        public int userId { get;set; }
        public DateTime date { get;set; }
        public int? projectId { get;set; }
        public DateTime clockIn { get;set; }
        public DateTime? clockOut { get;set; }
        public double? workHours { get;set; }
        public string? description { get;set; }
        public double? grade { get;set; }
        public string? attachment { get;set; }

        public Workday() { }

        public Workday (int id, int userId, DateTime date, int? projectId, DateTime clockIn, DateTime? clockOut, double? workHours, string? description, double? grade, string? attachment) {
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

        public Workday(int userId, DateTime date, int? projectId, DateTime clockIn, DateTime? clockOut, double? workHours, string? description, double? grade, string? attachment) {
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

        public override bool Equals(object obj) {
            var item = obj as Workday;

            if (item == null) {
                return false;
            }

            if(item.date.Year == this.date.Year && item.date.Month == this.date.Month && item.date.Day == this.date.Day)
            {
                return true;
            }
            else
            {
                return false;
            }

            
        }


    }
}
