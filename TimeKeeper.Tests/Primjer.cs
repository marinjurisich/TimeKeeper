namespace TimeKeeper.Tests;

// Imenovanje - KlasaShould
// Klasa - klasa čije se metode testiraju
public class KlasaShould
{

    // [Fact] - test koji se vrši jednom
    [Fact]
    public void DoSomething()
    {
        // Klasa should do something

        // SUT - System Under Test
        int sut1 = 1;
        int sut2 = 2;

        Assert.NotEqual(sut1, sut2);
    }

    // [Theory] - više testova
    [Theory]
    // [InlineData(BR)] - ulazne vrijednosti za testove
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    public void Multiply(int value)
    {
        // Klasa should multiply
        // (U pravilu bi se pozivala metoda koja pripada klasi Klasa)

        // int mult = Klasa.Multiply(value, 2)
        int mult = value * 2;

        int expected = value * 2;
        Assert.Equal(mult, expected);
    }

}
