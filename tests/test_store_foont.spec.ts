import { expect,test } from "@playwright/test";
// import {test} from "../fixture/fontend"
import { Home } from '../page/storefont/Home';
import { PRODUCT } from "../data/data_product";
import { DATA } from "../data/data_put-custumize";
import { ViewProduct } from '../page/storefont/ViewProduct';
import Color from 'color';
// import { rgbToHex } from '../helper/color';
test('hiện thị trên store font',async({page})=>{
    let home=new Home("shop-test-abc.onshopbase.com",page)
    await home.gotoHome()
    let viewproduct:ViewProduct;
    for(let i=0;i<PRODUCT.length;i++){
        for(let j=0;j<PRODUCT[i].name_product.length;j++){
            viewproduct= await home.gotoDetailProduct(PRODUCT[i].collection,PRODUCT[i].name_product[j]);
                let a=await viewproduct.getProrty('.copt-countdown .copt-realtime-visitors');
                await expect(a).toEqual(DATA.settings.realtime_visitors.font_size+"px");
                await expect(page.locator(".copt-countdown .copt-realtime-visitors")).toHaveCSS('color',Color(DATA.settings.realtime_visitors.text_color).string()) ;              
                let locator1=page.locator('.copt-countdown .copt-realtime-visitors__number');
                await expect(locator1).toHaveCSS('color',Color(DATA.settings.realtime_visitors.number_color).string());
                let b=DATA.settings.realtime_visitors.type;
                if(b==="fill"){
                    await expect(locator1).toHaveCSS('background-color',Color(DATA.settings.realtime_visitors.background_color).string());
                }else if(b==="outline"){
                    await expect(locator1).toHaveCSS('border-color',Color(DATA.settings.realtime_visitors.background_color).string());

                }else{
                    await expect(locator1).toHaveCSS('padding','0');

                }

            }
        }
    })