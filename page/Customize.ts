import { Page } from "@playwright/test";
import { CommonPage } from "./Page";

export class Customize extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    
}