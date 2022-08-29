import { request,test,expect } from '@playwright/test';
import {DATA} from "../data/data_put-custumize"
const auth=""

test("put cutumize",async({request})=>{
    const req=await request.put("https://shop-test-abc.onshopbase.com/admin/copt/countdown/customize.json",{
        data:DATA,
        headers:{
            'X-ShopBase-Access-Token': 'caa5d3f2886b6584842268c77f7772d589907b0a21b2d1bdcb3b290e0dc871e8'
        }
    });
    let b=await req.json();
    await expect(req).toBeOK();
    await expect(req.status()).toBe(200);
    await expect(b.settings.realtime_visitors).toMatchObject(DATA.settings.realtime_visitors);   
})