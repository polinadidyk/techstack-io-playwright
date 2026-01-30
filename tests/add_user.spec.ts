import { test, expect } from '@playwright/test'; //ВСЕ ТЕСТЫ ТУТ ПОКА НИЧЕГО НЕ ПРОВЕРЯЮТ ИСХОДЯ ИЗ КОДА
import { LoginPage } from "../pages/ligin"; 

test("goToPageTest", async ({ page }) => {
  await page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F'); // переход на страницу БЕЗ ЗАПОЛНЕНИЯ ПОЛЕЙ 
});


test.only("fillWithValidDataTest", async ({ page }) => {

const Login = new LoginPage(page) 

 await Login.goToLoginPage(); //заполняем валидными данными + САБМИТ
 await Login.login("admin","123");
 await expect(page).not.toHaveURL(/\/Login/i);



  //await page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F'); // заполнение полей БЕЗ САБМИТА
  //await page.getByTestId('username-field').getByTestId('input').click();
  //await page.getByTestId('username-field').getByTestId('input').fill('admin');
  //await page.getByTestId('password-field').getByTestId('input').click();
  //await page.getByTestId('password-field').getByTestId('input').fill('123');
  
});

test("SendWithoutDataTest", async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.goToLoginPage();
  await Login.signIn();

 //  await page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F'); //отправка пустой формы 
 // await page.getByRole('button', { name: 'Sign in' }).click();
});



test("SendWithInvalidDataTest", async ({ page }) => {

const Login = new LoginPage(page)  

await Login.goToLoginPage();
await Login.login("kjgh","321");

  //await page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F'); //отправка невалидных данных
  //await page.getByTestId('username-field').getByTestId('input').click();
  //await page.getByTestId('username-field').getByTestId('input').fill('admin');
  //await page.getByTestId('password-field').getByTestId('input').click();
  //await page.getByTestId('password-field').getByTestId('input').fill('321');
  //await page.getByTestId('password-field').getByTestId('input').press('Enter');
});
