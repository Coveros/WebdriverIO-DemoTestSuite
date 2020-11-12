const CodeverosPage = require('./codeverosPage');
const LoginCodeverosPage = require('./login.codeverosPage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WelcomeCodeverosPage extends CodeverosPage {
    /**
     * define selectors using getter methods
     */
    get welcomeHeader () { return $('//*[@class="mat-display-2 page-title"]') }
    get btnSignOut () { return $('button[id="sign-out-button"]') }
    get btnConfirmSignOut () { return $('//button[@id="confirm-sign-out"]') }

    signOut () 
    {
        this.btnSignOut.click();
        this.btnConfirmSignOut.waitForExist({ timeout: 3000 });
        this.btnConfirmSignOut.click();
        LoginCodeverosPage.inputUsername.waitForExist({ timeout: 3000 });
    }
}

module.exports = new WelcomeCodeverosPage();