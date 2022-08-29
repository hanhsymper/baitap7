import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import { Collection } from "./Collection";
import {ViewProduct} from "./ViewProduct"
export class Home extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async gotoHome(){
        await this.gotoPath("?digest=5e96338fd3ff04431d2650bdad629d9c2dfd73cc28e268e1428d19084d50be5e");
        await this.page.waitForNavigation();
    }
    async gotoProductURL(path:string){
        // https://au-abandoned-prodtest.onshopbase.com/products/urban-girl-t-shirt
             await this.page.goto(`https://${this.domain}/${path}`);
             await this.page.waitForNavigation();
             return new ViewProduct(this.domain,this.page)   
         }
    async gotoDetailProduct(collection:string,name_product:string){
            await this.page.goto(`https://${this.domain}/collections/${collection}/products/${name_product}`)
            await this.page.waitForNavigation();
            return new ViewProduct(this.domain,this.page)  
        }
    async gotoCollection(name:string){
        await this.gotoPath(`collections/${name}`);
        await this.page.waitForLoadState('domcontentloaded');
        return new Collection(this.domain,this.page)
    }
    // async gotoCartWithIcon(){

    // }
}