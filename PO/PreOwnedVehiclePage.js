import { expect } from "@playwright/test";
import fs from "fs";
import { BasePage } from "./BasePage";


export class VehicleDetaislPage extends BasePage{
    constructor(page){
        super(page);
        this.enquireNowButton = this.page.locator('[data-test-id="dcp-buy-box__contact-seller"]');
        this.vin = this.page.locator('li').filter({hasText: 'VIN', }).locator('span.dcp-vehicle-details-list-item__value');
        this.modelYear = this.page.locator('li').filter({hasText: 'Model Year', }).locator('span.dcp-vehicle-details-list-item__value');
        this.firstNameField = this.page.getByLabel(' First Name ');
        this.lastNameField = this.page.getByLabel(' Last Name ');
        this.emailField = this.page.getByLabel(' E-Mail ');
        this.phoneField = this.page.locator('input[type="text"][inputmode="tel"]');
        this.postalCodeField = this.page.getByLabel(' Postal Code ');
        this.commentsField = this.page.getByLabel('Comments (optional)');
        this.submitContactDetailsButton = this.page.locator('[data-test-id="dcp-rfq-contact-button-container__button-next"]')
        this.firstNameErrorMessage = this.page.locator('[data-test-id="rfq-contact__first-name"] wb-control-error');
        this.lastNameErrorMessage = this.page.locator('[data-test-id="rfq-contact__last-name"] wb-control-error');
        this.emailErrorMessage = this.page.locator('[data-test-id="rfq-contact__email"] wb-control-error');
        this.phoneErrorMessage = this.page.locator('[data-test-id="rfq-contact__phone"] wb-control-error');
        this.postalCodeErrorMessage = this.page.locator('[data-test-id="rfq-contact__postal-code"] wb-control-error');
        this.errorSectionItemList = this.page.locator('div.dcp-error-message ul.dcp-error-message-error-list__item');
      }   

    async getVinValue(){
        const vinValue = await this.vin.textContent();
        return vinValue;
    }

    async getModelYearValue(){
        const modelYearValue = await this.modelYear.textContent();
        return modelYearValue;
    }

    async writeDataToFile(data){
        fs.writeFile("saved-information/vehicleDetails.txt", JSON.stringify(data), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });
    }

    async openEnquireNowModal(){
      await this.clickOn(this.enquireNowButton);
    }

    async fillContactDetails(firstName, lastName, email, phone, postalCode, comment){
      await this.fillInputField(this.firstNameField, firstName);
      await this.fillInputField(this.lastNameField, lastName);
      await this.fillInputField(this.emailField, email);
      await this.fillInputField(this.phoneField, phone);
      await this.fillInputField(this.postalCodeField, postalCode);
      await this.fillInputField(this.commentsField, comment);
    }

    async submitContactDetailsForm(){
      await this.clickOn(this.submitContactDetailsButton);
    }

    async verifyErrorMessagePresence(errorElement, errorMessage){
      await this.verifyElementIsVisibe(errorElement);
      await this.verifyElementToHaveText(errorElement, errorMessage);
    }
    
}

