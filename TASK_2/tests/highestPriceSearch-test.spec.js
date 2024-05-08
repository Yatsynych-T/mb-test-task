const { test } = require('@playwright/test');
import { PageManager } from '../PO/PageManager.js';
import { INVALID_CONTACT_DETAILS, CONTACT_DETAILS_ERROR_MESSAGES } from '../constants/contactDetailsData.constants.js';
import { LOCATION_FORM } from '../constants/locationFormData.constants.js';
import { COLOURS } from '../constants/filterOptionsData.constants.js';

let pm;

test.beforeEach(async ({page}) => {
    pm = new PageManager(page);
    await pm.onDemoPage().gotoDemoPage();
})

test.afterEach(async ({page}) => {
    await page.close();
})

test("Validate the negative path of enquiring the highest price at Mercedes-Benz", async ({page}) => {
    await pm.onBasePage().agreeToAllCookies();
    await pm.onDemoPage().fillAndSubmitLocationForm(LOCATION_FORM.state, LOCATION_FORM.postalCode , LOCATION_FORM.purpose)
    await pm.onDemoPage().changeToPreownedFilter();
    await pm.onDemoPage().selectColourFilter(COLOURS.cosmosBlackMetallic);
    await pm.onDemoPage().openMostExpensiveVehicleDetails();
    const vinValue = await pm.onPreOwnVehicleDetaislPage().getVinValue();
    const modelYearValue = await pm.onPreOwnVehicleDetaislPage().getModelYearValue();
    await pm.onPreOwnVehicleDetaislPage().writeDataToFile({ vinValue, modelYearValue });
    await pm.onPreOwnVehicleDetaislPage().openEnquireNowModal();

    // Fill contact details fields with invalid values
    await pm.onPreOwnVehicleDetaislPage()
        .fillContactDetails(
            INVALID_CONTACT_DETAILS.firstName,
            INVALID_CONTACT_DETAILS.lastName,
            INVALID_CONTACT_DETAILS.email,
            INVALID_CONTACT_DETAILS.phone,
            INVALID_CONTACT_DETAILS.postalCode,
            INVALID_CONTACT_DETAILS.comments);
    await pm.onPreOwnVehicleDetaislPage().submitContactDetailsForm();

    // Verify that respective error messages are displayed 
    // for first name, last name, email, phone and postal code fields,
    // and general entered data error notification.
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().firstNameErrorMessage, CONTACT_DETAILS_ERROR_MESSAGES.firstName);
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().lastNameErrorMessage, CONTACT_DETAILS_ERROR_MESSAGES.lastName);
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().emailErrorMessage, CONTACT_DETAILS_ERROR_MESSAGES.email);
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().phoneErrorMessage, CONTACT_DETAILS_ERROR_MESSAGES.phone);
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().postalCodeErrorMessage, CONTACT_DETAILS_ERROR_MESSAGES.postalCode);
    await pm.onPreOwnVehicleDetaislPage()
        .verifyErrorMessagePresence(pm.onPreOwnVehicleDetaislPage().errorSectionItemList, CONTACT_DETAILS_ERROR_MESSAGES.incorrectData);
    
})
