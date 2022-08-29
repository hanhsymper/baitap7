import {test as base,Page} from "@playwright/test";
import { TOKEN } from "../data/token";
import { Login } from "../page/Login";
import { Home } from '../page/storefont/Home';
import { DashBoard } from '../page/DashBoard';
import { ACCOUNT } from "../data/data_login"; 
export const test=base.extend<{home:Home,dashBoard:DashBoard}>({
    home:async({page},use)=>{
        const login=new Login('shop-test-abc.onshopbase.com',page)
        const dashBoard = await login.gotoDashBoardByToKen(TOKEN);
        const home=await dashBoard.openYourSite();
        use(home);
    }

})
// export default test;