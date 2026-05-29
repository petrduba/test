import { test, expect } from '@playwright/test';

test('Prihlášení uživatele', async ({ page }) => {

  // Otevreni obchodu
  await page.goto('http://37.27.17.198:8084/cs/');

  // Prihlaseni
  await page.getByRole('link', { name: 'Přihlásit se', exact: true }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('adamec@adamec.cz');
  await page.getByRole('textbox', { name: 'Heslo' }).fill('Adamec@1718');
  await page.getByRole('button', { name: 'Přihlásit se' }).click();
  await page.getByRole('link', { name: ' Odhlásit' }).click();

});