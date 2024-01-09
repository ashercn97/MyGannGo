import puppeteer from 'puppeteer';

export default async function login({ testing=false, headless=true}) {
    const username = process.env.username;
    const password = process.env.pass;


    const browser = await puppeteer.launch({ headless: headless });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });

    // Set a common user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('requestfailed', request => console.log('Request failed:', request.url(), 'Reason:', request.failure().errorText));

    try {
        await page.goto('https://gannacademy.myschoolapp.com', { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('#Username', { visible: true });
        await page.type('#Username', username.toString());

        // Capture screenshots (for some reason this makes it work)
        await page.screenshot({ path: 'before-submit.png' });

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('input[type=submit]'), 
        ]);

        await page.waitForTimeout(5000);

        // Capture screenshot after navigation
        await page.screenshot({ path: 'after-submit.png' });

        // Additional code for further interaction...
        await page.type("#i0118", password.toString());
        await page.click("#idSIButton9");
        await page.waitForTimeout(5000);
        await page.click("#idBtn_Back");
        await page.waitForTimeout(5000);
        let wait = await page.$x(`/html/body/div[2]/div/form/div/div/div/div/div/div[2]/div[1]/div/div/form/div/span[1]/input`)
        await wait[0].click()
        await page.waitForTimeout(5000);

        if(testing) {
            console.log("TESTS PASSED")
            return [page, browser];
        }

        return [page, browser];


        /*
        if(testing){
            browser.close();
            return true
        }*/
    } catch (err) {
        console.error(err);
    }

}
