import { test, expect } from '@playwright/test';

var baseURL = 'http://localhost:8080';

// TODO: Fill in with test cases.
test('TEST-1-RESET', async ({ page }) => {
    
    await page.goto(baseURL);
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    });
    await page.getByRole('link', { name: 'Reset' }).click();
    await expect(page.locator('//html/body/div/main/div[1]/div/ul/li[1]')).toContainText('ID 1. Jennyanydots');
    await expect(page.locator('//html/body/div/main/div[1]/div/ul/li[2]')).toContainText('ID 2. Old Deuteronomy');
    await expect(page.locator('//html/body/div/main/div[1]/div/ul/li[3]')).toContainText('ID 3. Mistoffelees');
});

test('TEST-2-CATALOG', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page.locator('//html/body/div/main/div[1]/ol/li[2]/img')).toHaveAttribute("src", "/images/cat2.jpg");
});

test('TEST-3-LISTING', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page.locator('//*[@id="listing"]/ul/li')).toHaveCount(3);
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[3]')).toContainText('ID 3. Mistoffelees');
});

test('TEST-4-RENT-A-CAT', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Return' })).toBeVisible();
});

test('TEST-5-RENT', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByTestId('rentID').click();
    await page.getByTestId('rentID').fill('1');
    await page.getByRole('button', { name: 'Rent' }).click();
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[1]')).toContainText('Rented out');
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[2]')).toContainText('ID 2. Old Deuteronomy');
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[3]')).toContainText('ID 3. Mistoffelees');
    await expect(page.getByTestId('rentResult')).toContainText('Success!');
});

test('TEST-6-RETURN', async ({ page }) => {
    await page.goto(baseURL);
        await page.evaluate(() => {
        document.cookie = "2=true";
        document.cookie = "3=true";
    });
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.getByTestId('returnID').click();
    await page.getByTestId('returnID').fill('2');
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[1]')).toContainText('ID 1. Jennyanydots');
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[2]')).toContainText('ID 2. Old Deuteronomy');
    await expect(page.locator('//html/body/div/main/div[1]/div[1]/ul/li[3]')).toContainText('Rented out');
    await expect(page.getByTestId('returnResult')).toContainText('Success!');
});

test('TEST-7-FEED-A-CAT', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await expect(page.getByRole('button', { name: 'Feed' })).toBeVisible();
});

test('TEST-8-FEED', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await page.getByTestId('catnips').click();
    await page.getByTestId('catnips').fill('6');
    await page.getByRole('button', { name: 'Feed' }).click();
    await expect(page.getByTestId('feedResult')).toContainText('Nom, nom, nom.', { timeout: 10_000 });
});

test('TEST-9-GREET-A-CAT', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();
    await expect(page.getByTestId('greeting').getByRole('heading')).toContainText('Meow!Meow!Meow!');
});

test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {
    await page.goto(baseURL);
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    });
    
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await expect(page.locator('//html/body')).toHaveScreenshot();
});