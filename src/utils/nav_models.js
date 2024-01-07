import puppeteer, { ElementHandle } from 'puppeteer';


/*
    a way to handle nested navigation, like where you need to
    hover and then click
    
*/


/*
    the way this whole thing works!!
*/
class Action {
    constructor({ page, type, log=false, test=false, browser=null }){
        this.page = page

        
        if(type === "hover") {
            this.hover = true;
            this.click = false;
            this.hc = false
        } else if(type === "click") {
            this.click = true;
            this.hover = false;
            this.hc = false;
        } else if(type === "hover_click") {
            this.click = false
            this.hover = false
            this.hc = true
        } else {
            throw new Error("Type not implemented yet :-)")
        }

        this.log = log
        this.browser = browser
        this.test = test
    }

    async run(item) {

        if(this.hover) {
            const hover_item = item;
            const elements = await this.page.$x(hover_item);
            if(this.log){
                console.log("ELEMENTS: ", elements)
            }
            if (elements.length > 0) {
                await elements[0].hover();
                await this.page.waitForTimeout(5000);
        
                if (this.log) {
                    console.log(`Hovered over ${item}`);
                }
        
                if (this.test) {
                    if(this.browser) {
                        console.log("TESTS PASSED")
                        return true;
                    } else {
                        throw new Error("Browser not passed in, needed for testing")
        
                    }  
                }
        
                return [elements[0], this.page];
            }
        
        }

        if(this.click) {
            if (this.click && item instanceof ElementHandle) {
                if(this.log){
                    console.log("CLICKING ITEM: ", item)
                }
                await Promise.all([
                    this.page.waitForNavigation(),
                    item.click(),
                ])
                //await item.click();
                if(this.log) {
                    await this.page.on('console', message => console.log(message.text()));
                }
                await this.page.waitForTimeout(5000);
        
                if (this.log) {
                    console.log(`Clicked on an element handle`);
                }
        
                if (this.test) {
                    if (this.browser) {
                        console.log("TESTS PASSED")
                        return true
                    } else {
                        throw new Error("Browser not passed in, needed for testing")
                    }
                }
        
                return this.page;
            } else {
                const click_item = item;
                const elements = await this.page.$x(click_item);
                if(this.log) {
                    console.log("ELEMENTS: ", elements)
                }
                if (elements.length > 0) {
                    await elements[0].click();
                    await this.page.waitForTimeout(5000);
        
                    if (this.log) {
                        console.log(`Clicked ${item}`);
                    }
        
                    if (this.test) {
                        if (this.browser) {
                            console.log("TESTS PASSED")
                        } else {
                            throw new Error("Browser not passed in, needed for testing")
                        }
                    }
                    return this.page;
                }
            }
        }

        if(this.hc){
        const elements = await this.page.$x(item);
        if (elements.length === 0) {
            throw new Error(`No elements found for XPath: ${item}`);
        }

        // Hover over the element
        await elements[0].hover();
        if (this.log) {
            console.log(`**HC** Hovered over ${item}`);
        }

        // Optionally wait after hover
        await this.page.waitForTimeout(1000); // Adjust timeout as needed

        // Click the same element after hovering
        await elements[0].click();
        if (this.log) {
            console.log(`**HC** Clicked on ${item}`);
        }

        // Handle test and logging
        if (this.test) {
            if (this.browser) {
                console.log("TESTS PASSED");
                return true;
            } else {
                throw new Error("Browser not passed in, needed for testing");
            }
        }

        return this.page;
    
    }


}
}


class NavItem {
    /*
        basically a fancy object with a few methods
        name: the name of the parent
        xpath: an xpath object, just so i can check if something is a string or not
        type: whether the thing this is is clickable or hoverable
    */

    constructor({name, xpath, type="click"}) {
        this.main = {name: name, xpath: xpath, type: type}
    }

    get name() {
        return this.main.name;
    }

    get xpath() {
        return this.main.xpath;
    }

    get type() {
        return this.main.type;
    }

    render() {
        return {name: this.main.name, xpath: this.main.xpath, type: this.main.type}
    }


}
class NavParent {
    /*
        name: the name of the parent
        children: an array of NavItem s

        if children is null, then it is the base level of the nav
        like just a normal button

        if parent is null, then this is the base level/something 
        that is just used as a name

    */
    constructor({name, children, config, xpath, type}) {
        this.main = {
            name: name, 
            xpath: xpath ? xpath : "not implemented yet/not applicable :-)",
            type: type,
            children: children ? children : null
        }
        this.config = config
    }
    get name() {
        return this.main.name;
    }
    get xpath() {
        return this.main.xpath;
    }

    child(name) {
        return this.main.children.find(child => child.name === name);
    }

    get children() {
        return this.main.children;
    }

    get type() {
        return this.main.type;
    }


    async run(name) {
        const child = this.child(name);
        if (!child) {
            throw new Error("Child not found");
        }
    
        let parentElementHandle = null;
    
        if (this.xpath && this.xpath !== "not implemented yet/not applicable :-)") {
            const parentAction = new Action({ page: this.config.page, type: this.type, log: this.config.log, test: this.config.test, browser: this.config.browser });
            const parentResult = await parentAction.run(this.xpath);
    
            // If parent action is hover, keep the element handle for child actions
            if (this.type === 'hover') {
                parentElementHandle = parentResult[0];
            }
        }

        /*
        MIGHGT NEEED THIS, NOT SURE


        if (child.type === 'hover_click') {
            const hoverClickAction = new Action({ page: this.config.page, type: 'hover_click', log: this.config.log, test: this.config.test, browser: this.config.browser });
            return await hoverClickAction.run(child.xpath);
        }
        */
    
        const childActionType = parentElementHandle && child.type === 'click' ? 'click' : child.type;
        const childAction = new Action({ page: this.config.page, type: childActionType, log: this.config.log, test: this.config.test, browser: this.config.browser });
        const actionItem = parentElementHandle || child.xpath;
        return await childAction.run(child.xpath);
    }
    

    render() {
        var renders = this.children.map(child => child.render());
        return {name: this.main.name, children: renders, type: this.main.type};
    }
    
}


class NavNested {
    constructor(config) {
        this.progress_navbar = new NavParent({
            name: "Progress_Navbar", 
            xpath: null,
            config: config,
            type: "click",
            children:
                [
                    new NavItem({name: "Progress_Button_List", xpath: "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[1]/a", type: "click"}),
                    new NavItem({name: "Schedule_Button_List", xpath: "/html/body/div[2]/div/div[6]/div[3]/div/ul/li[2]/a", type: "click"})
                ]
        })

        this.my_day_hover = new NavParent({
            name: "My_Day_Hover",
            config: config,
            xpath: "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/a/span[1]/span",
            type: "hover",
            children: [
                new NavItem({name: "Progress_Button", xpath: "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[1]/a", type: "click"}),
                new NavItem({name: "Schedule_Button", xpath: "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[2]/a", type: "click"}),
                new NavItem({name: "Assignment_Center_Button", xpath: "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[3]/a", type: "click"}),
                new NavItem({name: "Conduct_Button", xpath: "/html/body/div[2]/div/div[6]/div[2]/div[1]/div/div/div/ul/li[1]/div[2]/ul/li[4]/a", type: "click"}),
                /* would add the other ones, but who even uses those */
            ]
        })

    }
}


export { NavItem, NavParent, NavNested}