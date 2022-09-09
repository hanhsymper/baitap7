import {expect} from "@playwright/test";
import {test} from "../fixture/fontend"
import {DATA} from "../data/data_add_product";
import { ViewProduct } from '../page/storefont/ViewProduct';
// const authorization = 'd181079644dcb15ec2208f696f9deb9e2e6ce8321bbecb5312bba4ee31904ea6';

const authorization: string =  process.env.TOKEN!;

test("test add product",async({request})=>{
    let handle:string;
    let id:number;
    let title:string;
    await test.step("add product",async()=>{
        const b=await request.post("https://shop-test-hong-hanh.onshopbase.com/admin/products.json?skip_package_checking=undefined",{
            data: DATA,
            headers:{
                'X-ShopBase-Access-Token':authorization
            }
        });
        let repon=await b.json();
        handle=repon.product.handle;
        id=repon.product.id;
        title=repon.product.title;
        await expect(b).toBeOK();
        await expect(b.status()).toBe(200);
        
    });
    await test.step("check storefront",async()=>{
        const data=await request.get(`https://shop-test-hong-hanh.onshopbase.com/api/catalog/next/product/${handle}.json?digest=7067a024c9713ec27a0e8c0b328fea5b1f468cdcb5ada0951c9ffce3876fd40e`);
        let respon=await data.json();
        let respon_id=respon.result.id;  
        let respon_title=respon.result.title;      
        expect(respon_id).toEqual(id);
        expect(respon_title).toEqual(DATA.product.title);
        
    })
})

test.only("view product",async({home})=>{
    const viewProduct = await home.gotoDetailProduct("test-1234","a-test");
    console.log(await viewProduct.page.locator("//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").innerText());
    expect(await viewProduct.page.locator("//h1[@class='h4 d-block product__name mt0 mb12 product__name-product']").innerText()).toEqual("A TEST");
    expect(await viewProduct.page.locator("//div[@class='product__price h4']").innerText()).toEqual("$100.00")

})
