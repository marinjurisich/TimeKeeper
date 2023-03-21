using System.Text.RegularExpressions;
using TimeKeeper.Models;

namespace TimeKeeper.Tests; 

public class UserShould {

    [Fact]
    public void GenerateRandomPassword()
    {
        // User should generate random password

        User sut1 = new User("firstName", "lastName", "email@mail.com", false, 7.33, 1);
        User sut2 = new User("firstName", "lastName", "email@mail.com", false, 7.33, 1);

        Assert.NotEqual(sut1.password, sut2.password);
    }

    [Fact]
    public void GenerateProperGuid()
    {
        User sut1 = new User("firstName", "lastname", "example@email.com", false, 1.0, 1);

        // GUID pattern - XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
        // Where X is a hex digit (0123456789ABCDEF)
        Regex guidRegex = new Regex(
            @"[0-9A-F]{8}-([0-9A-F]{4}-){3}[0-9A-F]{12}",
            RegexOptions.IgnoreCase
        );

        Assert.Matches(guidRegex, sut1.guid);
    }

    [Fact]
    public void InitializeProperly()
    {
        // Check if all parameters are set properly
        int id = 3;
        string firstName = "John";
        string lastName = "Doe";
        string email = "john.doe@example.com";
        string password = "some_pw";
        bool isAdmin = true;
        double payPerHour = 13.0;
        int companyId = 1234;
        double grade = 5.0;
        string guid = System.Guid.NewGuid().ToString();

        var sut = new User(id, firstName, lastName, email, password, isAdmin, payPerHour, companyId, grade, guid);

        Assert.Equal(sut.id, id);
        Assert.Equal(sut.firstName, firstName);
        Assert.Equal(sut.lastName, lastName);
        Assert.Equal(sut.email, email);
        Assert.Equal(sut.password, password);
        Assert.Equal(sut.isAdmin, isAdmin);
        Assert.Equal(sut.payPerHour, payPerHour, 0.00001);
        Assert.Equal(sut.companyId, companyId);
        Assert.Equal(sut.grade, grade);
        Assert.Equal(sut.guid, guid);
    }

}