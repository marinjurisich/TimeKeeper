using System.ComponentModel.DataAnnotations;

namespace TimeKeeper.Models {
    public class UserSalt {

        [Key]
        public string email { get; set; }
        public byte[] salt { get; set; }

    }
}
