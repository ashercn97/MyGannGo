import login from '../src/utils/login.js';
import { HoverNav, hover_option } from '../src/utils/nav_outdated.js';

try {
    var [page, browser] = await login({ test: false, headless: true });
    console.log("PAGE: ", page);
    console.log("BROWSER: ", browser);


    for (const item in hover_option) {
        await HoverNav({ page, item, log: true, test: true, browser });
    }
} catch (error) {
    console.error(error);
} finally {
    // Close the browser after all operations
    await browser.close();
}

