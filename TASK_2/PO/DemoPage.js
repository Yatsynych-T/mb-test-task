import { expect } from "@playwright/test";
import { demoPageURL } from "../constants/url.constants";
import { BasePage } from "./BasePage";
import { SORTING_OPTIONS } from "../constants/sortingOptions.constants";


export class DemoPage extends BasePage {
    constructor(page){
        super(page);
        this.stateDropdown = this.page.getByRole("dialog").locator("select");
        this.postalCodeInput = this.page.locator("input[aria-labelledby='postal-code-hint']");
        this.purposeRadioButtonsContainter = this.page.locator("div.dcp-radio__options-container");
        this.locationSubmitButton = this.page.locator("button[data-test-id='state-selected-modal__close']");
        this.toggleFilterButton = this.page.locator("div.sidebar svg[xmlns='http://www.w3.org/2000/svg'][data-v-18cba724]"); 
        this.preowndeFilter = this.page.locator('div.dcp-cars-filter-widget').getByText(" Pre-Owned");
        this.demonstratorFilter = this.page.locator('div.dcp-cars-filter-widget').getByText(" Demonstrator");
        this.colourFilter = this.page.locator('div[data-v-0b8abf29] p').filter({hasText: 'Colour'});
        this.colourFilterDropdown = this.page.locator("[data-test-id='multi-select-dropdown']").filter({hasText: 'Colour'});
        this.coloursList = this.page.locator("[data-test-id='multi-select-dropdown']").filter({hasText: 'Colour'}).locator('a');
        this.sortingDropdown = this.page.locator("div#srp-result select");
        this.sortingPriceDesc = this.page.locator("option[value='price-desc-demo']");
        this.allVehiclesCards = this.page.locator("div.dcp-cars-product-tile");
        this.firstVehicleCard = this.allVehiclesCards.first();
        this.allVehiclesPrices = this.page.locator("div.dcp-cars-product-tile span").filter({hasText: "A$"});
        this.firstVehiclePrice = this.allVehiclesPrices.first();

    }   

    async gotoDemoPage(){
        await this.page.goto(demoPageURL);
    }

    async fillAndSubmitLocationForm(state, postalCode, purpose){
        await this.stateDropdown.selectOption(state);
        await this.fillInputField(this.postalCodeInput, postalCode);
        await this.purposeRadioButtonsContainter.getByText(purpose).check();
        await this.clickOn(this.locationSubmitButton);
    }

    async openFilter(){
        const filterState = await this.toggleFilterButton.getAttribute("class");
        if(filterState == 'show'){
            await this.clickOn(this.toggleFilterButton);
        }
    }

    async changeToPreownedFilter(){
        await this.openFilter();
        await this.clickOn(this.preowndeFilter);

    }

    async changeToDemonstratorFilter(){
        await this.openFilter();
        await this.clickOn(this.demonstratorFilter);
    }

    async selectColourFilter(colour){
        await this.openFilter();
        await this.colourFilter.click();
        await this.colourFilterDropdown.click();
        const requiredColour = this.coloursList
        .filter({ has: this.page.locator(`text="${colour}"`)});
        await this.clickOn(requiredColour);
        await this.expectElementClassToContainValue(requiredColour, 'selected')
    }

    async sortVehiclesBy(sortingMethod){
        await this.sortingDropdown.selectOption({label: sortingMethod } );
        await this.waitForPageToLoad();
        const pricesArray = await this.getAllVehiclesPrices();
        let pricesInNumbers = [];
        
        for(let i of pricesArray){
           pricesInNumbers.push(parseFloat(i.replace(",", "").replace("A$", "")));
        }
        
        const sortedPrices = pricesInNumbers.sort((a,b) => b-a)
        await this.expectValuesToBeEqual(pricesInNumbers, sortedPrices);
    }

    // Returns an array of vehicle prices present on the current page
    async getAllVehiclesPrices(){
        await this.waitForTheElementToBeLoaded(this.firstVehiclePrice);
        await this.waitForPageToLoad();
        return this.allVehiclesPrices.allTextContents();
    }
    
    async openFirstVehicleDetails(){
        await this.clickOn(this.firstVehicleCard);
    }

    /*
     * Sorts the vehicles by price descending, then
     * opens the details page of the first vehicle in the list
     */
    async openMostExpensiveVehicleDetails(){
        await this.sortVehiclesBy(SORTING_OPTIONS.priceDescending);
        await this.openFirstVehicleDetails();
    }
}

