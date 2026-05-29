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

  // Přidání do košíku + čekání na AJAX
  await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('cart') && resp.status() === 200
    ),
    page.locator('button[data-button-action="add-to-cart"]').click()
  ]);

  // Modal košíku
  const modal = page.locator('#blockcart-modal');

  await expect(modal).toBeVisible({ timeout: 15000 });

  await expect(modal).toContainText(
    'Produkt byl úspěšně přidán do nákupního košíku'
  );

  // Pokračovat v nákupu
  await modal.getByRole('button', {
    name: 'Pokračovat v nákupu'
  }).click();

  // Otevření stránky CLOTHES
  await page.getByText('Clothes').click();

  // Klik na produkt tričko
  await page.getByRole('link', { name: 'Hummingbird printed t-shirt' }).first().click();
  
  // Kontrola URL trička
  await expect(page).toHaveURL(/8-barva-bila/);

  // Výběr velikosti z S na M
  await page.locator('#group_1').selectOption('2'); // M
  
  // Přidání do košíku + čekání na AJAX
  await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('cart') && resp.status() === 200
    ),
    page.locator('button[data-button-action="add-to-cart"]').click()
  ]);

  // nový modal pro druhý produkt
const modal2 = page.locator('#blockcart-modal');

await expect(modal2).toBeVisible({ timeout: 15000 });

await expect(modal2).toContainText(
  'Produkt byl úspěšně přidán do nákupního košíku'
);

await modal2.getByRole('button', {
  name: 'Pokračovat v nákupu'
}).click();
  
  // Otevřít Košík
  await page.getByRole('link', { name: 'Košík' }).click();

  // Kontrola produků dle názvu
  await expect(page.getByText('Mug The best is yet to come')).toBeVisible();
  await expect(page.getByText('Hummingbird printed t-shirt')).toBeVisible();
  
  // Zpět na hlavní stránku
  await page.goto('http://37.27.17.198:8084/cs/');
  
 
});