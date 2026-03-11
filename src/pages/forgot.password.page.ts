import { Page, Locator } from "@playwright/test";

export class ResetPasswordPage {
    constructor(private readonly page: Page) { }

    async CurrentPassword(password_1: string) {
        await this.page.fill("#root_currentPassword", password_1);
    }

    async NewPassword(password_2: string) {
        await this.page.fill("#root_newPassword", password_2);
    }

    async ConfirmNewPassword(password_3: string) {
        await this.page.fill("#root_reNewPassword", password_3);
    }

    async ResetPassword() {
        await this.page.getByRole("button", { name: "Reset Password" }).click();
    }

}
