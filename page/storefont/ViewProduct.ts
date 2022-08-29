import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
export class ViewProduct extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async getProrty(locator:string){
        const loc=this.page.locator(locator);
        const value=await loc.evaluate((el)=>{
            return window.getComputedStyle(el).getPropertyValue('font-size')
        });
        return value;
    }
    // async checkTypeBorder(type:string){
    //     let result="";
    //     if(type==="fill"){
    //         result="background-color";
    //     }else if(type="Outline"){
    //         result="border-color"
    //     }else{
    //         result="padding";
    //     }
    //     return result;
    // }
    async getText(){
        return this.page.locator(`//h1[@class="h3 product__name is-uppercase mt0 mb12"]`).innerText();
     }
    }