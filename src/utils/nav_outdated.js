import puppeteer, { ElementHandle } from 'puppeteer';


/*
    a way to handle nested navigation, like where you need to
    hover and then click
    
*/



class NavItem {
    /*
        name: the name of the parent
        parent: the xpath of the parent
        children: an array of NavItems

        if children is null, then it is the base level of the nav
        like just a normal button
    */
    constructor(name, parent, children) {
        this.main = {name: name, xpath: parent, children: children ? children : null}
    }
}
class NavNested {
    constructor() {
        this.click_option = {
            "Progress_Button_List": "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[1]/a",
            "Schedule_Button_List": "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[2]/a",
        
        }
        this
    }
}


/*

    these objects are used to navigate the site.
    click_option are the things that can be clicked on,
    and the hover_option are things that can be hovered on

*/

const click_option = {
    //"Progress_Button_Dropdown": "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[1]/a",
    "Progress_Button_List": "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[1]/a",

    //"Schedule_Button_Dropdown": "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[2]/a",
    "Schedule_Button_List": "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[2]/a",


}

const hover_option = {
    "My_Day_Button": "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/a/span[1]/span",
    "Classes_Button": "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[2]/a/span[1]"
}


// returns [element, page]
// item is a string that is in hte hover_option object
const HoverNav = async ({ page, item, log=false, test=false, browser=null }) => {
    const hover_item = hover_option[item];
    const elements = await page.$x(hover_item);
    if(log){
        console.log("ELEMENTS: ", elements)
    }
    if (elements.length > 0) {
        await elements[0].hover();
        await page.waitForTimeout(3000);

        if (log) {
            console.log(`Hovered over ${item}`);
        }

        if (test) {
            if(browser) {
                console.log("TESTS PASSED")
                return true;
            } else {
                throw new Error("Browser not passed in, needed for testing")

            }  
        }

        return [elements[0], page];
    }
};


/*
    clicknav takes a page and an item. The item can be:
    * the name of one of the things in the click object
    * a puppeteer element
*/


const ClickNav = async ({ page, item, log=false, test=false, browser=null }) => {
    if (item instanceof ElementHandle) {
        await item.click();
        await page.waitForTimeout(5000);

        if (log) {
            console.log(`Clicked on an element handle`);
        }

        if (test) {
            if (browser) {
                console.log("TESTS PASSED")
                return true
            } else {
                throw new Error("Browser not passed in, needed for testing")
            }
        }

        return page;
    } else {
        const click_item = click_option[item];
        const elements = await page.$x(click_item);
        if(log) {
            console.log("ELEMENTS: ", elements)
        }
        if (elements.length > 0) {
            await elements[0].click();
            await page.waitForTimeout(3000);

            if (log) {
                console.log(`Clicked ${item}`);
            }

            if (test) {
                if (browser) {
                    console.log("TESTS PASSED")
                } else {
                    throw new Error("Browser not passed in, needed for testing")
                }
            }


            return page;
        }
    }
};

export { ClickNav, HoverNav, click_option, hover_option };