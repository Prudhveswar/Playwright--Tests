import { expect, test } from '@playwright/test';
import { InventoryPage } from '../page-objects/inventory.page';
import { CartPage } from '../page-objects/cart.page';

test(
  'User Flow 001',
  {
    annotation: {
      type: 'User Flow 001',
      description: 'This test verifies the user flow for adding a random product to the cart.',
    },
  },
  async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Step 1: Navigate to inventory page (using stored authentication state)
    await test.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
      await inventoryPage.verifyPageLoaded();
    });

    let expectedProductName: string;
    let cartProduct: string;

    // Step 2: Add a random product to cart
    await test.step('Add a random product to cart', async () => {
      expectedProductName = await inventoryPage.addRandomProductToCart();
      console.log(`Added product to cart: ${expectedProductName}`);
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    //Step 3 : Click on cart to view items
    await test.step('Click on cart to view items', async () => {
      await inventoryPage.cartBadge.click();
    });

    const cartPage = new CartPage(page);
    //Step 4: Verify the product is added to the cart
    await test.step('Verify the product added', async () => {
      cartProduct = await cartPage.cartItemName.innerText();
      console.log(`Product found in the cart page: ${cartProduct}`);
      await expect(cartPage.cartItemName).toHaveText(expectedProductName);
    });

    //Step 5: Proceed to checkout and fill in the details from CSV
    await test.step('Proceed to checkout and fill in the details from CSV', async () => {
      await cartPage.checkoutButton.click();
      
    });
  }
);
