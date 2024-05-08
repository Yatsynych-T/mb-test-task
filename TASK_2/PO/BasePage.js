import { expect } from "@playwright/test";

export class BasePage {
    constructor(page){
        this.page = page;
        this.allCookies = this.page.locator("div.buttons-wrapper").getByText("Agree to all");
    }

    async clickOn(element){
        await element.click();
    }

    async fillInputField(element, value) {
        await element.click();
        await element.clear();
        await element.fill(value);
    }

    async verifyElementIsVisibe(element){
        await expect(element).toBeVisible();
    }

    async verifyElementToHaveText(element, text){
        await expect(element).toHaveText(text);
    }

    async agreeToAllCookies(){
        await this.clickOn(this.allCookies);
    }

    async waitForPageToLoad(){
        await this.page.waitForFunction(() => {
            const element = document.querySelector('div.dcp-loader');
            return element.classList.contains('dcp-loader--hide');
          });
    }

    async waitForTheElementToBeLoaded(element) {
        await element.waitFor({state: "attached", timeout: 5000});
    }

    async expectElementClassToContainValue(element, value){
        const elementClassValue = await element.getAttribute("class");
        expect(elementClassValue).toContain(value);
    }

    async expectValuesToBeEqual(firstValue, secondValue){
        expect(firstValue).toEqual(secondValue);
    }
}