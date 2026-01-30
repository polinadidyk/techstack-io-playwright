exports.LoginPage = class LoginPage {

    constructor (page) {
    this.page = page
    this.username_textbox = page.getByTestId('username-field').getByTestId('input');
    this.password_textbox = page.getByTestId('password-field').getByTestId('input');
    this.signin_button = page.getByRole('button', { name: 'Sign in' });
    
}

async goToLoginPage(){
    await this.page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F');
}

async login(username, password){
    await this.username_textbox.fill(username);
    await this.password_textbox.fill(password);
    await this.signin_button.click();
}

async signIn(){
   await this.signin_button.click()
}

}