const LoginCodeverosPage = require('../pageobjects/login.codeverosPage');
const WelcomeCodeverosPage = require('../pageobjects/welcome.codeverosPage');
const RegistrationCodeverosPage = require('../pageobjects/registration.codeverosPage');
const fetch = require("node-fetch");


describe('Successfully Login to CODEveros', () => {

    var name = null;
    var password = null;

    beforeEach(() => {
        name = RegistrationCodeverosPage.makeName(6);
        password = 'SuperSecretPassword!';
        var data = {
            firstName: name,
            lastName: name,
            username: name,
            email: name+"@gmail.com",
            password: password
        };
        fetch("http://localhost/api/auth/register", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then(res => {
            console.log("Request complete! response:", res);
        });
        LoginCodeverosPage.open();
    })

    it('should login with valid credentials', () => {
        LoginCodeverosPage.login(name, password);

        expect(WelcomeCodeverosPage.welcomeHeader).toBeExisting();
        expect(WelcomeCodeverosPage.welcomeHeader).toHaveTextContaining(
            'Welcome to CODEveros');
        
        WelcomeCodeverosPage.signOut();
    });

    it('should error out without required field - username', () => {
        LoginCodeverosPage.login("", password);
        LoginCodeverosPage.cursorRedirect();

        expect(LoginCodeverosPage.requiredFieldMessageUsername).toBeExisting();
    });

    it('should error out without required field - password', () => {
        LoginCodeverosPage.login(name, "");
        LoginCodeverosPage.cursorRedirect();

        expect(LoginCodeverosPage.requiredFieldMessagePassword).toBeExisting();
    });
});

describe('Failed Login Tests - Not Authorized', () => {
    it('should fail due to user does not exist', () => {
        LoginCodeverosPage.open();
        LoginCodeverosPage.login("something", "something");

        expect(LoginCodeverosPage.failedLoginMessage).toBeExisting();
    })
})
