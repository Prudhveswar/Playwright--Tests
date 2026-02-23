import { test, expect } from '@playwright/test';

test.describe('Saucedemo - Order Two Products', () => {
  test('should successfully add two products to cart and complete checkout', async ({ page }) => {
    // Step 1: Navigate to inventory page (using stored authentication state)
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Step 2: Verify products page is loaded
    await expect(page).toHaveTitle(/Swag Labs/);
    
    // Step 3: Add first product (Sauce Labs Backpack) to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Step 4: Add second product (Sauce Labs Bike Light) to cart
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Step 5: Verify items are added to cart (cart badge shows 2)
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('2');
    
    // Step 6: Click on cart to view items
    await page.click('[data-test="shopping-cart-link"]');
    
    // Step 7: Verify cart page shows both items
    await expect(page).toHaveURL(/cart/);
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);
    
    // Step 8: Click Checkout button
    await page.click('[data-test="checkout"]');
    
    // Step 9: Verify checkout info page is loaded
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // Step 10: Fill in checkout information
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Step 11: Click Continue button
    await page.click('[data-test="continue"]');
    
    // Step 12: Verify checkout overview page is loaded
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // Step 13: Verify products are displayed on overview page
    const overviewItems = page.locator('[data-test="inventory-item"]');
    await expect(overviewItems).toHaveCount(2);
    
    // Step 14: Verify total price is calculated
    const totalLabel = page.locator('[data-test="total-label"]');
    await expect(totalLabel).toBeVisible();
    
    // Step 15: Click Finish button to complete order
    await page.click('[data-test="finish"]');
    
    // Step 16: Verify order completion page
    await expect(page).toHaveURL(/checkout-complete/);
    
    // Step 17: Verify success message
    const successMessage = page.locator('[data-test="complete-header"]');
    await expect(successMessage).toContainText('Thank you for your order');
    
    // Step 18: Verify order placed with pony express image visible
    const ponyExpress = page.locator('[data-test="pony-express"]');
    await expect(ponyExpress).toBeVisible();
    
    console.log('✅ Order completed successfully!');
  });
});
