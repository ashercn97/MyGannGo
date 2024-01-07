import login from './src/utils/login.js';

(async () => {
    try {
        var [page, browser] = await login({ testing: false, headless: true });
        console.log("PAGE: ", page);
        console.log("BROWSER: ", browser);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        // Close the browser after all operations
        await browser.close();
    }
})