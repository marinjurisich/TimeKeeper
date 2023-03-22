namespace TimeKeeper.Models {
    public class Project {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int companyId { get; set; }

        public Project(string name, string description, int companyId) {
            this.name = name;
            this.description = description;
            this.companyId = companyId;
        }

        public Project(int id, string name, string description, int companyId) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.companyId = companyId;
        }
    }
}
