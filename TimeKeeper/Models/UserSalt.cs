using System.ComponentModel.DataAnnotations;

namespace TimeKeeper.Models {
    public class UserSalt {

        [Key]
        public string email { get; set; }
        public byte[] salt { get; set; }

        public UserSalt(string email, byte[] salt) {
            this.email = email;
            this.salt = salt;
        }

    }
}
