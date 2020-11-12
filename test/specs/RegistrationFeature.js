const RegistrationCodeverosPage = require('../pageobjects/registration.codeverosPage');
const WelcomeCodeverosPage = require('../pageobjects/welcome.codeverosPage');
const fetch = require("node-fetch");


describe('Successfully Register a new user', () => {
    it('should register a new user in Codeveros portal', () => {
        RegistrationCodeverosPage.goToRegistrationTab();

        var newUser = RegistrationCodeverosPage.makeName(7);
        RegistrationCodeverosPage.fillIn(newUser, newUser, newUser, newUser+'@gmail.com', 'SP!', 'SP!');
        RegistrationCodeverosPage.submit();
        expect(WelcomeCodeverosPage.welcomeHeader).toBeExisting();
        expect(WelcomeCodeverosPage.welcomeHeader).toHaveTextContaining(
            'Welcome to CODEveros');

        WelcomeCodeverosPage.signOut();
    });
});

describe('Registration Failed', () => {
    beforeEach(() => {
        RegistrationCodeverosPage.goToRegistrationTab();
    })

    it('try to register a new user without username', () => {

        RegistrationCodeverosPage.fillIn(" ", " ", " ", "a@gmail.com", "aaa", "aaa");
        RegistrationCodeverosPage.submit();

        expect(RegistrationCodeverosPage.registrationFailedMessage).toBeExisting();
    })

    it ('try to create a new user with invalid email - without @', () => {

        RegistrationCodeverosPage.fillIn(" ", " ", " ", "agmail.com", "aaa", "aaa");

        expect(RegistrationCodeverosPage.invalidEmailMessage).toBeExisting();
    })


    it ('try to create a new user with invalid email - invalid domain name', () => {
        
        RegistrationCodeverosPage.fillIn(" ", " ", " ", "a@.", "aaa", "aaa");

        expect(RegistrationCodeverosPage.invalidEmailMessage).toBeExisting();
    })

    it ('Try to create a new user with invalid email - invalid domain name', () => {
        
        RegistrationCodeverosPage.fillIn(" ", " ", " ", "a@.com", "aaa", "aaa");

        expect(RegistrationCodeverosPage.invalidEmailMessage).toBeExisting();
    })

    it ('try to create a new user without password', () => {
        var name = RegistrationCodeverosPage.makeName(6);

        RegistrationCodeverosPage.fillIn(" ", " ", name, "a@gmail.com", "", "aaa");
        RegistrationCodeverosPage.cursorRedirect();

        expect(RegistrationCodeverosPage.invalidPasswordMessage).toBeExisting();
    })

    it ('try to create a new user without confirmed password', () => {
        var name = RegistrationCodeverosPage.makeName(6);

        RegistrationCodeverosPage.fillIn(" ", " ", name, "a@gmail.com", "aaa", "");
        RegistrationCodeverosPage.cursorRedirect();
        
        expect(RegistrationCodeverosPage.invalidPasswordMessage).toBeExisting();
    })

    it ('try to create a new user confirmed password mismatch', () => {
        var name = RegistrationCodeverosPage.makeName(6);

        RegistrationCodeverosPage.fillIn(" ", " ", name, "a@gmail.com", "aaa", "bb");

        expect(RegistrationCodeverosPage.passwordMismatchMessage).toBeExisting();
    })
})

describe('Registration Failed - Register a user twice', function(){
    it ('try to register the same user twice', () => {
        var name = RegistrationCodeverosPage.makeName(6);
        var password = "aat";
        var data = {
            firstName: name,
            lastName: name,
            username: name,
            email: name+"@gmail.com",
            password: password
        };
        fetch("http://localhost/api/auth/register", {
            method: "POST", 
            headers: 
                {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        }).then(fetch("http://localhost/api/auth/register", {
                    method: "POST", 
                    headers: 
                        {
                            'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(data)
                }).then(res => {
                expect(res.status).toEqual(500);
                })
            );
    })
})