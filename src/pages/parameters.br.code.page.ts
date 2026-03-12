import { Page, Locator, expect } from "@playwright/test";
import { equal } from "node:assert";
import { time } from "node:console";

export class ParametersBranchCodePage {
  constructor(private readonly page: Page) { }

  get parametersMenu(): Locator {
    return this.page.locator('div.MuiListItemText-root', { hasText: 'Parameters' });
  }

  get branchCodeLink(): Locator {
    return this.page.locator('div.MuiListItemText-root', { hasText: 'Branch Code' });
  }
  get RowsPerPageDropdown(): Locator {
    return this.page.locator('.MuiSelect-root')
  }

  get RowsOption10(): Locator {
    return this.page.getByRole('option', { name: '10', exact: true });
  }
  get RowsOption25(): Locator {
    return this.page.getByRole('option', { name: '25', exact: true });
  }
  get RowsOption100(): Locator {
    return this.page.getByRole('option', { name: '100', exact: true });
  }

  get ViewButton(): Locator {
    return this.page.getByRole('button', { name: 'View', exact: true }).first();
  }

  get EditButton(): Locator {
    return this.page.getByRole('button', { name: 'Edit', exact: true }).first();
  }

  get DeleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Delete', exact: true }).first();
  }
  get ContinueDeleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue', exact: true }).first();
  }
  get SuccessDeleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue', exact: true });
  }

  get AddNewButton(): Locator {
    return this.page.getByRole('button', { name: 'Add New', exact: true });
  }

  async openParametersMenu(): Promise<void> {
    await this.parametersMenu.waitFor({ state: "visible", timeout: 30000 });
    await this.parametersMenu.click();
  }

  async navigateToBranchCode() {
    await this.branchCodeLink.waitFor({ state: "visible", timeout: 30000 });
    await this.branchCodeLink.click();
  }

  async verifyNavigationToBranchCode(): Promise<void> {
    await this.page.waitForURL(/.*\/branch-code\/list$/, { timeout: 30000 });
  }

  async verifyBranchCodeGridColumns(): Promise<void> {
    const expectedColumns = [
      "Branch Code",
      "Branch Name",
      "Actions"
    ];
    for (const columnName of expectedColumns) {
      const columnHeader = this.page.locator(`.MuiTableHead-root:has-text("${columnName}")`);
      await columnHeader.waitFor({ state: "visible", timeout: 30000 });
    }
  }

  async selectRowsPerPage(rows: string): Promise<void> {
    await this.RowsPerPageDropdown.click();
    await this.page.getByRole('option', { name: rows, exact: true }).click();
  }
  //10 rows 
  async click10RowsPerPageDropdown(): Promise<void> {
    await this.RowsOption10.waitFor({ state: 'visible', timeout: 30000 })
    await this.RowsOption10.click();
  }
  //25 rows
  async click25RowsPerPageDropdown(): Promise<void> {
    await this.RowsPerPageDropdown.click();
    await this.RowsOption25.waitFor({ state: 'visible', timeout: 30000 })
    await this.RowsOption25.click();
  }
  //100 rows
  async click100RowsPerPageDropdown(): Promise<void> {
    await this.RowsPerPageDropdown.click();
    await this.RowsOption100.waitFor({ state: 'visible', timeout: 30000 })
    await this.RowsOption100.click();
  }

  async verifyRowsCount(expectedRows: number): Promise<void> {
    const rows = this.page.locator("tbody tr");
    await rows.first().waitFor({ state: 'visible' });
    const rowCount = await rows.count();
    console.log(`rows displayed:${rowCount}`);
    expect(rowCount).toBeLessThanOrEqual(expectedRows);
  }

  async viewOption(): Promise<void> {
    await this.ViewButton.waitFor({ state: "visible", timeout: 30000 });
    await this.ViewButton.click();

    await expect(this.page.getByText("View Branch Details")).toBeVisible();
  }

  async editOption(): Promise<void> {
    await this.EditButton.waitFor({ state: "visible", timeout: 30000 });
    await this.EditButton.click();

    await expect(this.page.getByText("Edit Branch Details")).toBeVisible();
  }

  /*async addNew():Promise<void>{
    await this.AddNewButton.waitFor({state: "visible", timeout:30000});
    await this.AddNewButton.click();

    await expect(this.page.getByText("Add Branch Details")).toBeVisible();
  }*/



  /*async deleteOption(): Promise<void> {
    await this.DeleteButton.waitFor({ state: "visible", timeout: 30000 });
    await this.DeleteButton.click();

    await expect(this.page.getByText("Warning")).toBeVisible();
    await this.ContinueDeleteButton.waitFor({state: "visible", timeout: 30000});
    await this.ContinueDeleteButton.click();

    await this.SuccessDeleteButton.waitFor({state: 'visible', timeout:30000});
    await this.SuccessDeleteButton.click();
  }*/

}
