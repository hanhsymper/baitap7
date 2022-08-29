import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import { DashBoard } from "./DashBoard";

export type InforLogin={
    email:string;
    password:string;

}

export class Login extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async gotoDashBoardByToKen(token:string){
        await this.gotoPath(`admin?${token}`);
        await this.page.waitForLoadState('load');
        return new DashBoard(this.domain,this.page)  
    }
}