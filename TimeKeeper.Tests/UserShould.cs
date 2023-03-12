using TimeKeeper.Models;

namespace TimeKeeper.Tests {

    public class UserShould { //test klasa se naziva prema onoj klasi koja se testira, dodaje se should koji u kombinaciji s nazivom testa oznacava sto klasa treba raditi -> User Should Generate Random Password

        [Fact] //oznaka za test, vidi xunit dokumentaciju za bolje objsanjenje i razliku izmedu [Fact] i [Theory] anotacija
        public void GenerateRandomPassword() { //funkcija koja je zapravo test

            User sut1 = new User("firstName", "lastName", "email@mail.com", false, 7.33, 1); //sut -> System Under Test, oznaka za ono sto se testira
            User sut2 = new User("firstName", "lastName", "email@mail.com", false, 7.33, 1);

            Assert.NotEqual(sut1.password, sut2.password); //Assert je klasa koja izvršava testiranje i vraca true ili false ovisno o rezultatu pozvane metode. Ovdje se usporeduje da su 2 lozinke razlièite s metodom NotEqual u sluèaju da su lozinke iste, test ce failat

            /*
                Testovi se u Visual Studiu pokrecu kroz test explorer, mozes ga naci na vrhu ekrana pod Test
                Solution se mora buildati kad se doda novi test, nekad i kad se rade promjene na postojeæem testu
                Test možes debugirati tako da u test exploreru kliknes desni klik na njega i odaberes debug
                Ovdje imas popis nekih (nezz jesu sve) Assert metodi:
                    https://gist.github.com/jonesandy/f622874e78d9d9f356896c4ac63c0ac3
                    https://textbooks.cs.ksu.edu/cis400/1-object-orientation/04-testing/05-xunit-assertions/
                Ideje za testove:
                    provjeriti da li user generira validan guid pomoæu regexa
                    provjeriti da je duljina generirane lozinke 8 znakova
             */



        }
    }
}