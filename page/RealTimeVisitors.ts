import { Page } from "@playwright/test";
import { CommonPage } from "./Page";

export class RealTimeVisitors extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async statusRealTime(){
        let status='bat';
        if(await this.page.locator('.s-switch.s-ml12 input').isChecked()!==true){
            status='tat';
        }
        return status;
    }
    async onOffRealTime(option:string){
        let status=await this.statusRealTime();
        if(status!==option){
            if(option==="bat"){
                await this.page.locator('.s-switch.s-ml12 .s-check').click();
            }else{
                await this.page.locator('.s-switch.s-ml12 .s-check').click();
            }
        }
    }
    async clickButtoChange(){
        await Promise.all([
            await this.page.locator("//button[@class='s-button btn-change is-default']").click(),
            await this.page.waitForLoadState('domcontentloaded')
          ]);
      
    }
    async fillDataIntoInput(from:string,to:string){
        // await this.page.locator(".s-form-item.is-success input").click();
        await this.page.locator("//form[@class='s-form number-items-form s-form--inline']//label[text()='Random from']/parent::div//following-sibling::*//input").fill(from);
        // await this.page.locator("//div[@class='s-form-item is-success']//following-sibling::div[@class='s-form-item']//input").click();
        await this.page.locator("//form[@class='s-form number-items-form s-form--inline']//label[text()='to']/parent::div//following-sibling::*//input").fill(to);
    }

    async getQuantityDisplay(locator:string){
        await this.page.waitForSelector(locator);
         const count= await this.page.$$(locator);
         return count.length

    }
    async deleteAll(){
        await this.page.locator("//span[@data-label='Remove All']/span").click();
    }
    async clickTrigger(name:string,typeDisplay:string,nameDisplay:any[]){
        if(name==='Show for all products'){
                await this.page.locator(`//form[@class='s-form']//span[contains(text(),"Show for all products")]`).click();
        }else{
            await this.page.locator(`//form[@class='s-form']//span[contains(text(),"Show for some products I specify")]`).click();
            // await this.page.locator("//div[@class='s-select s-mr16']//select").click();
            // await this.page.locator(`//div[@class='s-select s-mr16']//option[contains(text(),${typeDisplay})]`).click();
            await this.page.locator("//div[@class='s-select s-mr16']//select").selectOption({value:typeDisplay});
            await this.page.locator("//button[@class='s-button s-mr16 is-default']").click();
            await this.page.waitForSelector("//div[@class='s-modal-wrapper']");
            const count= await this.page.$$(".mdi.mdi-minus-circle-outline.mdi-24px");        
            //chọn kiểu hiện thị
            for(let i of nameDisplay){
                // if(await this.page.locator(`//div[contains(text(),"${i}")]//ancestor::div[contains(@class,'product-selector__item')]//i[@class='mdi mdi-minus-circle-outline mdi-24px']`).isVisible()===true){
                    // await this.page.locator(`//div[contains(text(),"${i}")]//ancestor::div[contains(@class,'product-selector__item')]//i[@class='mdi mdi-minus-circle-outline mdi-24px']`).click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await this.page.locator(`//div[contains(text(),"${i}")]//ancestor::div[contains(@class,'product-selector__item')]//i[@class='mdi mdi-plus-circle-outline mdi-24px']`).click();
            // }else{
            //     await this.page.locator(`//div[contains(text(),"${i}")]//ancestor::div[contains(@class,'product-selector__item')]//i[@class='mdi mdi-plus-circle-outline mdi-24px']`).click();
            // }
        }
            await Promise.all([
                await this.page.locator(`//span[contains(text(),'Continue with selected products')]`).click(),
                await this.page.waitForLoadState('domcontentloaded')
              ]);
              return count.length
    }
}

    async clickButtonSave(){
        if(await this.page.locator(".row.save-setting-content").isVisible()===true){
            await this.page.locator("//div[@class='row save-setting-content']//span[contains(text(),'Save')]").click();
            await this.page.waitForSelector("//div[@class='s-notices is-bottom']//div[contains(text(),'Your settings was updated successfully')]")

        }
    }
    
}