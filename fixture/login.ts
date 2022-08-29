import {test as base,Page} from "@playwright/test";
import { TOKEN } from "../data/token";
import { Login } from "../page/Login";
import { DashBoard } from '../page/DashBoard';
import { ACCOUNT } from "../data/data_login"; 
export const test=base.extend<{login:Login,dashBoard:DashBoard}>({
    dashBoard:async({page},use)=>{
        const login=new Login('shop-test-abc.onshopbase.com',page)
        const dashBoard = await login.gotoDashBoardByToKen(TOKEN);
        await use(dashBoard);
    }

})