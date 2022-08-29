import { Page } from "@playwright/test";
import { CommonPage } from "./Page";

export class Apps extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
   async click(){
             await this.page.goto(`https://${this.domain}/admin/apps`);
             await this.page.waitForNavigation();
             return new Apps(this.domain,this.page)   
         }
   }
