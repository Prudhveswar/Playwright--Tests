import { expect, Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync'; 
import { UtilityFunction } from '../shared/Utils/utility-function';

type SauceDemoRow = {
  'First Name': string;
  'Last Name': string;
  'ZIP Code': string;
};

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(public page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  async fillCheckoutInformation(): Promise<SauceDemoRow> {
    // `checkout.page.ts` lives in `tests/page-objects`, while the CSV lives in `tests/shared/data/`
    const filePath = path.join(__dirname, '..', 'shared', 'data', 'SauceDemo_CSV.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as SauceDemoRow[];

    if (records.length === 0) {
      throw new Error('CSV has no rows to use for checkout.');
    }

    const randomUser = UtilityFunction.getRandomElementFromArray(records);

    await this.firstNameInput.fill(randomUser['First Name']);
    await this.lastNameInput.fill(randomUser['Last Name']);
    await this.postalCodeInput.fill(randomUser['ZIP Code']);

    return randomUser;
  }
}