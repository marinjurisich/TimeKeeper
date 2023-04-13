namespace TimeKeeper.Models {
    public class RegistrationDTO {

        public Company Company { get; set; }
        public User User { get; set; }

        public RegistrationDTO() { }
        public RegistrationDTO(Company company, User user) {
            this.Company = company;
            this.User = user;
        }

    }
}
