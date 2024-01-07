import get_cookies from './src/utils/cookies.js';

(async () => {
    try {
        // async function get_cookies({ log=true, headless=true, stringify=false }) {

        const cookies = await get_cookies({ log: true, headless: true, stringify: true });
        console.log("COOKIES STRING: ", cookies);

        console.log("TEST PASSED")
    }

    catch (error) {
        console.error(error);
    }

    finally {
        // Close the browser after all operations
        await browser.close();
    }
})