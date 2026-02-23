import { expect, test } from '@playwright/test';
import { InventoryPage } from '../page-objects/inventory.page';

test(
    "User Flow 001",
    {
      annotation: {
        type: "User Flow 001",
        description: "This test verifies the user flow for adding a random product to the cart.",
      }
    },
    async ({ page }) => {
      const inventoryPage = new InventoryPage(page);

      // Step 1: Navigate to inventory page (using stored authentication state)
      await test.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
      await inventoryPage.verifyPageLoaded();
      });
      
      // Step 2: Add a random product to cart
      await test.step('Add a random product to cart', async () => {   
      const productName = await inventoryPage.addRandomProductToCart();
      console.log(`Added product to cart: ${productName}`);
      await expect(inventoryPage.cartBadge).toHaveText('1');
      });

      //Step 3 : Click on cart to view items
      await test.step('Click on cart to view items', async () => {
        
    }
)