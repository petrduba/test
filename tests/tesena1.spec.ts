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

test('Pridani polozky', async ({ page }) => {

  // Otevreni obchodu
  await page.goto('http://37.27.17.198:8084/cs/');

  // Klik na produkt
  await page.getByRole('link', {
    name: 'Mug The best is yet to come'
  }).first().click();

  // kontrola URL
  await expect(page).toHaveURL(/mug-the-best-is-yet-to-come/);

  // pridani do kosiku
  await page.locator('button[data-button-action="add-to-cart"]').click();
  
  //await page.click('button:has-text("Do košíku")');
  await expect(page.getByText('Produkt byl úspěšně přidán')).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Pokračovat v nákupu")');

  await page.getByText('Clothes').click();
  await page.getByRole('link', { name: 'Hummingbird printed t-shirt' }).first().click();
  await expect(page).toHaveURL(/8-barva-bila/);
  await page.locator('#group_1').selectOption('2'); // M
  await page.locator('button[data-button-action="add-to-cart"]').click();
  //await page.click('button:has-text("Do košíku")');
  await expect(page.getByText('Produkt byl úspěšně přidán')).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Pokračovat v nákupu")');
  await page.getByRole('link', { name: 'Košík' }).click();
  await expect(page.getByText('Mug The best is yet to come')).toBeVisible();
  await expect(page.getByText('Hummingbird printed t-shirt')).toBeVisible();
  await page.goto('http://37.27.17.198:8084/cs/');
  
 
});



// Otevreni obchodu
  /*await page.goto('http://37.27.17.198:8084/cs/');
  
    // Pridani prvni polozky do kosiku
  await page.getByRole('link', { name: 'Mug The best is yet to come' }).first().click();
  await expect(page).toHaveURL(/mug-the-best-is-yet-to-come/);
  async function addToCart(page) {
  await page.click('button:has-text("Do košíku")');
  await expect(page.locator('.modal')).toBeVisible();
});
*/
