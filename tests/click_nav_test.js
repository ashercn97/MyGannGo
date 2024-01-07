import login from '../src/utils/login.js';
import { ClickNav, click_option } from '../src/utils/nav_outdated.js';

try {
    var [page, browser] = await login({ testing: false, headless: true });


    for (const item in click_option) {
        page = await ClickNav({ page, item, log: true, test: false, browser });
    }
} catch (error) {
    console.error(error);
} finally {
    // Close the browser after all operations
    await browser.close();
}

