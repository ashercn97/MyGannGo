import get_assignment_center from "../src/utils/assignments";

(async () => {
    try {

        console.log("HINT: if there is an error, make sure proxy server is running")
        const assignment_center_json = await get_assignment_center({ log: true, headless: true });
        console.log("ASSIGNMENT CENTER JSON: ", assignment_center_json);

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