// Import necessary classes and utilities
import login from '../src/utils/login.js';
import { NavItem, NavParent, NavNested } from '../src/utils/nav_models.js'; // Replace with the correct path to your classes

(async () => {
    let browser;
    try {
        // Login and get the page and browser objects
        const [page, browser] = await login({ test: false, headless: false });

        // Initialize your navigation structure
        const navConfig = { page, log: true, test: false, browser };
        const navNested = new NavNested(navConfig);

        // Example of using NavNested to perform actions
        // Replace 'someChildName' with actual child name you want to interact with
        await navNested.progress_navbar.run('Progress_Button_List');
        await navNested.my_day_hover.run('Schedule_Button');

        // Add more navigation interactions as needed...

    } catch (error) {
        console.error('Error in navigation test:', error);
    } finally {
        // Close the browser
        if (browser) {
            await browser.close();
        }
    }
})();

