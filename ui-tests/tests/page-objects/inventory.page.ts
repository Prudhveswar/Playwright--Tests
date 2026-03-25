import { expect, Locator, Page } from '@playwright/test';
import { UtilityFunction } from '../shared/Utils/utility-function';

export class InventoryPage {
  readonly sauceLabsBackpackAddToCartButton: Locator;
  readonly sauceLabsBikeLightAddToCartButton: Locator;
  readonly sauceLabBoltTshirtAddToCartButton: Locator;
  readonly sauceLabsFleeceJacketAddToCartButton: Locator;
  readonly sauceLabsOnesieAddToCartButton: Locator;
  readonly testAllTheThingsTshirtRedAddToCartButton: Locator;
  readonly inventoryItem: Locator;
  readonly cartBadge: Locator;

  constructor(public page: Page) {
    this.sauceLabsBackpackAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.sauceLabsBikeLightAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-bike-light');
    this.sauceLabBoltTshirtAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
    this.sauceLabsFleeceJacketAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
    this.sauceLabsOnesieAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-onesie');
    // Using page.locator (Safest for special characters like '.' and '()')
    this.testAllTheThingsTshirtRedAddToCartButton = page.locator(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    );
    this.inventoryItem = page.locator('.inventory_item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  //Function to select a random product and add it to the cart
  async addRandomProductToCart() {
    const itemCount = await this.inventoryItem.count();
    const randomIndex = UtilityFunction.getRandomIndexFromAnArrayCount(itemCount);
    const randomProduct = await this.inventoryItem.nth(randomIndex);
    const productName = await randomProduct.locator('.inventory_item_name').innerText();
    await randomProduct.getByRole('button', { name: 'Add to cart' }).click();
    return productName;
  }

  //Function to navigate to the inventory page
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  //Function to verify the inventory page is loaded
  async verifyPageLoaded() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}
