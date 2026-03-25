import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItemName: Locator;

  constructor(public page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItemName = page.getByTestId('inventory-item-name');
  }
}
