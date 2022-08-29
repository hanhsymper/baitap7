import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import { Apps } from "./Apps";
import {RealTimeVisitors} from "./RealTimeVisitors";
import { Customize } from "./Customize";
import { Home } from "./storefont/Home";
export class DashBoard extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    // async clickBoostConvert(){
    //    await this.page.locator(`//span[text()='Apps']`).click();
    //    await this.page.waitForNavigation();
    // }
   async gotoRealTimeByURL(){
        await this.page.goto(`https://${this.domain}/admin/apps/boost-convert/ctool/realtime-visitors`);
        await this.page.waitForLoadState();
        return new RealTimeVisitors(this.domain,this.page)   
    }
    async gotoCustomizeByURL(){
        await this.page.goto(`https://${this.domain}/admin/apps/boost-convert/ctool/customize`);
        await this.page.waitForNavigation();
        return new Customize(this.domain,this.page)   
    }
    async openYourSite(){
        await this.page.locator(".thumb-sm.avatar.pull-left.m-r-sm").click();
        await this.page.waitForSelector(".s-dropdown-menu.drop-down-user-style");
        await this.page.locator("//div[@class='s-dropdown-menu drop-down-user-style']//div[text()='Open your site']").click();
        await this.page.waitForLoadState("networkidle");
        return new Home(this.domain,this.page)
    }
   }
