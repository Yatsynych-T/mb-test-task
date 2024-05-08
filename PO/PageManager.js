import { BasePage } from "./BasePage";
import { DemoPage } from "./DemoPage";
import { VehicleDetaislPage } from "./PreOwnedVehiclePage";

export class PageManager {
    constructor(page){
        this.page = page;
        this.basePage = new BasePage(this.page);
        this.demoPage = new DemoPage(this.page);
        this.vehicleDetaislPage = new VehicleDetaislPage(this.page);
    }

    onDemoPage(){
        return this.demoPage;
    }

    onBasePage(){
        return this.basePage;
    }

    onPreOwnVehicleDetaislPage(){
        return this.vehicleDetaislPage;
    }
}