const CodeverosPage = require('./codeverosPage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginCodeverosPage extends CodeverosPage {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#sign-in-username') }
    get inputPassword () { return $('#sign-in-password') }
    get btnSubmit () { return $('button[type="submit"]') }
    get failedLoginMessage () { return $('//p[contains(text(),"Failed login")]') } 
    get requiredFieldMessageUsername () { return $('//mat-error') } 
    get requiredFieldMessagePassword () { return $('//mat-error') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) 
    {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

    cursorRedirect () {
        this.inputUsername.click();
    }

    clearUsername () 
    {
        this.inputUsername.clearValue();
    }

    clearPassword () 
    {
        this.inputPassword.clearValue();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () 
    {
        return super.open('login');
    }
}

module.exports = new LoginCodeverosPage();