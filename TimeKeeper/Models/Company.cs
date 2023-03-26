namespace TimeKeeper.Models {
    public class Company {

        public int id {  get; set; }
        public string name { get; set; }
        public string address { get; set; }

        public Company() {}

        public Company (string name, string address) {
            this.name = name;
            this.address = address;
        }

        public Company(int id, string name, string address) {
            this.id = id;
            this.name = name;
            this.address = address;
        }



    }
}
