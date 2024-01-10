import login from './login.js';
import { parse_cookies, make_cookie_string, orderCookies } from './parse_cookies.js';

async function get_cookies({ log=true, headless=true, stringify=false }) {
    const [page, browser] = await login({ testing: false, headless: headless});



    const link = await page.$x("/html/body/div[2]/div/div[6]/div[3]/div/ul/li[3]/a");
    if (link.length > 0) {
        await link[0].click();
    } else {
        throw new Error('Link not found');
    }

    await page.waitForTimeout(3000);

        // 1. Get Cookies
    const cookies = await page.cookies();

    if(log) {
        console.log("MYGANN Cookies: ", cookies);
    }

    if(stringify) {
        browser.close();
        return orderCookies(cookies);
    }


    // Keep the browser open for debugging
    await page.waitForTimeout(1000);
    await browser.close();

    return cookies;
}

export default get_cookies;
