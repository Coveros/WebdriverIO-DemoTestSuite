const CodeverosPage = require('./codeverosPage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegistrationCodeverosPage extends CodeverosPage {
    /**
     * define selectors using getter methods
     */
    get registrationTab () { return $('//div[@class="mat-tab-label mat-ripple ng-star-inserted"]') }
    get inputFirstname () { return $('#register-firstname') }
    get inputLastname () { return $('#register-lastname') }
    get inputUsername () { return $('#register-username') }
    get inputEmail () { return $('#register-email')}
    get inputPassword () { return $('#register-password') }
    get inputConfirmPassword () { return $('#register-confirm-password') }
    get registrationFailedMessage () { return $('//p[contains(text(), "Failed registration")]') }
    get invalidEmailMessage () { return $('//mat-error[contains(text(), "A valid email address is required")]') }
    get invalidPasswordMessage () { return $('//mat-error[contains(text(), "This is required")]') }
    get passwordMismatchMessage () { return $('//mat-error[contains(text(), "Passwords must match")]') }
    get btnSubmit () { return $('button[type="submit"]') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    makeName(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    fillIn (fname, lname, username, email, password, confpassword) {
        this.inputFirstname.setValue(fname);
        this.inputLastname.setValue(lname);
        this.inputUsername.setValue(username);
        this.inputEmail.setValue(email);
        this.inputPassword.setValue(password);
        this.inputConfirmPassword.setValue(confpassword);
    }

    submit() {
        this.btnSubmit.click(); 
    }

    cursorRedirect() {
        this.inputFirstname.click();
    }

    clearPasswordField() {
        this.inputPassword.clearValue();
    }

    clearConfirmPasswordField () {
        this.inputConfirmPassword.clearValue();
    }

    goToRegistrationTab () {
        this.open();
        this.registrationTab.click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
    
}

module.exports = new RegistrationCodeverosPage();