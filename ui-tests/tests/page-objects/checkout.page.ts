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
      columns: (header: string[]) => header.map((value) => value.trim().replace(/^\uFEFF/, '')),
      bom: true,
      skip_empty_lines: true,
      trim: true,
    }) as SauceDemoRow[];

    if (records.length === 0) {
      throw new Error('CSV has no rows to use for checkout.');
    }

    const randomUser = UtilityFunction.getRandomElementFromArray(records);
    const firstName = randomUser['First Name']?.trim();
    const lastName = randomUser['Last Name']?.trim();
    const zipCode = randomUser['ZIP Code']?.trim();

    if (!firstName || !lastName || !zipCode) {
      throw new Error(
        `Invalid CSV row selected for checkout: ${JSON.stringify(randomUser)}. ` +
          'Expected non-empty "First Name", "Last Name", and "ZIP Code".'
      );
    }

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zipCode);

    return randomUser;
  }
}