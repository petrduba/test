import { test, expect } from '@playwright/test';

test('Prihlášení uživatele', async ({ page }) => {

  // Otevření obchodu
  await page.goto('http://37.27.17.198:8084/cs/');

  // Přihlášení a odhlášení
  await page.getByRole('link', { name: 'Přihlásit se', exact: true }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('adamec@adamec.cz');
  await page.getByRole('textbox', { name: 'Heslo' }).fill('Adamec@1718');
  await page.getByRole('button', { name: 'Přihlásit se' }).click();
  await page.getByRole('link', { name: ' Odhlásit' }).click();

});

test('Přidání položky', async ({ page }) => {

  // Otevreni obchodu
  await page.goto('http://37.27.17.198:8084/cs/');

  // Klik na produkt hrneček
  await page.getByRole('link', {
    name: 'Mug The best is yet to come'
  }).first().click();

  // kontrola URL hrnečku
  await expect(page).toHaveURL(/mug-the-best-is-yet-to-come/);

  // Přidání do košíku
  //await page.locator('button[data-button-action="add-to-cart"]').click();
  
  await page.click('button:has-text("Přidat do košíku")');

  await expect(
  page.locator('#myModalLabel')
  ).toBeVisible({ timeout: 10000 });

await page.getByRole('button', { name: 'Pokračovat v nákupu' }).click();

  /* Ověření popup okna a pokračování v nákupu
  await expect(page.getByText('Produkt byl úspěšně přidán')).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Pokračovat v nákupu")');*/
  

  // Otevření stránky CLOTHES
  await page.getByText('Clothes').click();

  // Klik na produkt tričko
  await page.getByRole('link', { name: 'Hummingbird printed t-shirt' }).first().click();
  
  // Kontrola URL trička
  await expect(page).toHaveURL(/8-barva-bila/);

  // Výběr velikosti z S na M
  await page.locator('#group_1').selectOption('2'); // M
  
  // Přidání do košíku
  //await page.locator('button[data-button-action="add-to-cart"]').click();
  
  await page.click('button:has-text("Přidat do košíku")');

  await expect(
  page.locator('#myModalLabel')
  ).toBeVisible({ timeout: 10000 });

await page.getByRole('button', { name: 'Pokračovat v nákupu' }).click();

  /*/ Ověření popup okna a pokračování v nákupu
  await expect(page.getByText('Produkt byl úspěšně přidán')).toBeVisible({ timeout: 10000 });
  await page.click('button:has-text("Pokračovat v nákupu")');*/
  
  // Otevřít Košík
  await page.getByRole('link', { name: 'Košík' }).click();

  // Kontrola produků dle názvu
  await expect(page.getByText('Mug The best is yet to come')).toBeVisible();
  await expect(page.getByText('Hummingbird printed t-shirt')).toBeVisible();
  
  // Zpět na hlavní stránku
  await page.goto('http://37.27.17.198:8084/cs/');
  
 
});