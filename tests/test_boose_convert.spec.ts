import {  expect,request } from '@playwright/test';
import {test} from "../fixture/login";
import { RealTimeVisitors } from '../page/RealTimeVisitors';
import { REALTIME } from '../data/data_real_time';

test('test when click button save in screen real time', async ({dashBoard, page }) => {
    const RealTimeVisitors =  await dashBoard.gotoRealTimeByURL();
    // await RealTimeVisitors.onOffRealTime('bat')
    await RealTimeVisitors.clickButtoChange();
    await RealTimeVisitors.fillDataIntoInput(REALTIME.random_from,REALTIME.random_to);
    await RealTimeVisitors.clickTrigger(REALTIME.trigger,REALTIME.type_display,REALTIME.arr_product)
    await RealTimeVisitors.clickButtonSave();

    await expect(page.locator(`//form[@class='s-form']//span[contains(text(),"${REALTIME.trigger}")]`)).toBeChecked();
    let y = REALTIME.random_from;
    let z = REALTIME.random_to;
    let random_from=await page.locator("//form[@class='s-form number-items-form s-form--inline']//label[text()='Random from']/parent::div//following-sibling::*//input").inputValue();
    let random_to=await page.locator("//form[@class='s-form number-items-form s-form--inline']//label[text()='to']/parent::div//following-sibling::*//input").inputValue();
    await expect(random_from).toEqual(y);
    await expect(random_to).toEqual(z);
    // let count_pr=await RealTimeVisitors.getQuantityDisplay(".mdi.mdi-minus-circle-outline.mdi-24px");

    // let count_pr_select=Number(count_pr)+Number(REALTIME.arr_product.length);
    // console.log(Number(count_pr))
    
    // if(REALTIME.type_display==='product'){
    //     await expect(page.locator("//div[@class='s-ml24']/span")).toContainText(count_pr_select+" products selected")
    //    // 2 products selected
    // }else{
    //     // 1 collection selected
    //     await expect(page.locator("//div[@class='s-ml24']/span")).toContainText(count_pr_select+" collection selected")

    //     // await expect(page.locator("//div[@class='s-ml24']/span"))
    // }


});
