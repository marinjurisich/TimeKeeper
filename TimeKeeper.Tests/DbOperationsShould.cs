using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeKeeper.Data.DbOperations;
using TimeKeeper.Data;
using TimeKeeper.Models;

namespace TimeKeeper.Tests {
    public class DbOperationsShould {

        byte[]? salt;


        [Fact]
        public void HashPasswordRandomly() {
            // Same password should give 2 different hashes if using different salt

            DbOperations sut = new DbOperations();

            string password = "TestPassword";

            string hashedPassword1 = sut.HashPasword(password, out salt);
            string hashedPassword2 = sut.HashPasword(password, out salt);


            Assert.NotEqual(hashedPassword1, hashedPassword2);
        }

        [Fact]
        public void VerifyPasswordConsistently() {
            //same password with the same salt should give the same hash
            DbOperations sut = new DbOperations();

            string password = "TestPassword";
            string base64Salt = "TBXJWgpDuADmfb/BBFNCSm7G7VwctQ/nLzg3TfW8Byk7B55IVmQJbOTbSqWd9XXlMlk5nn4z+ais3fBR0kmPsA==";
            string expectedHash = "80EA7B3C979BF51045EA9EB2FAABBBFC858BECABA5A653EC9E06965DF5FA95843045C25BFD66E63F202FA5E04A9CF7C1F2889F769C0AEEB2458D3F373D1BE439";

            salt = Convert.FromBase64String(base64Salt);

            string hash = sut.ValidatePassword(password, salt);

            Assert.Equal(expectedHash, hash);

            salt = Array.Empty<byte>();
        }

    }
}
