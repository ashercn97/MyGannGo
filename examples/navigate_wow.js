/*

    in this example (omg im making these and they ARE SO ANNOYING OT MAKE)
    you can see hwo to navigate around the pages of mygann,
    and also (pretty pls) ill show you how to add more navigation options
    bc im rlly rlly kind 

    this like took forever cuz in the nav_outdated i had a nice simple 
    method to do this, but then i wanted it to be pretty sooooo
*/

import login from '../src/utils/login.js';
import { NavItem, NavParent, NavNested } from '../src/utils/models/nav_models.js'; // Replace with the correct path to your classes

// first thing you need to make a browser and page
const [page, browser] = await login({ test: false, headless: false }); // not headless so u can see that it works

// then you need to make a config object
// page is just hte page you made, log is the same as all the others 
// test is for testing but i never used it and im too lazy to remove it
// browser is the browser that i dont think we need anymore but im not gonna 
// get rid of it (cuz what if)
const navConfig = { page, log: true, test: false, browser };

// thennnn we need to make a NavNested object, which is basicallly
// the key to the kingdom of navigating mygann through code

const navNested = new NavNested(navConfig);

// then you start using it! 
// here is the current navigation:

/*
    CURRENT NAVIGATION OPTIONS:

    - Progress_Navbar (the navbar at the top of the page
        when you click on progress or assignment schedule or whatever)
        - Progress_Button_List (the button that says "progress")
        - Schedule_Button_List (the button that says "schedule")

    - My_Day_Hover (the hoverable thing (this was a total pain to make)
    that when you hover over shows like all the things)
        - Progress_Button (the button that says "progress")
        - Schedule_Button (the button that says "schedule")
        - Assignment_Center_Button (the button that says "assignment center")
        - Conduct_Button (the button that says "conduct")
    
    I WANT TO ADD MORE BUT I DONT KNOW WHAT PPL NEED
    ... 
    the way i say people like someone will actually use this lol
    

*/

// so to use it you just do this:
await navNested.progress_navbar.run('Progress_Button_List');

// basically you need to go down the rabit hole of objects,

// okay so now I will show you how to add your own navigation options
// *IF* you do, pls open a pull request id love to have more

/*
        so what you do is you go to the nav modules file
        then in the NavNested class, you make your own 
        atribute, and in that you make a new
        NavParent object, which is just a holder for all the 
        navigation stuff

        The navigation parent takes this:
        name -- the name of the parent
        xpath -- I will talk about later, see Sect I
        config -- the config object, jsut write config
        type -- whether its a click or hover object. 
        You can know because you will either click on it or hover on it
        to see the children
        children -- I will talk about later, see Sect II

        Sect I: xpath
        so the xpath is the xpath of the parent element
        so for the mydayhover part, it was the xpath of the 
        button.

        To find xpath, you need to double/right click on teh 
        element that you want to open, and then click inspect
        then, it will show a highlighted thing in the side. right/double
        click on that and then you can hit copy then copy **FULL** xpath

        Then, paste that here.

        IF YOUR THING DOESNT HAVE AN XPATH, DONT WORRY
        jsut write null

        Sect II: children
        children are the things that you can clck or hover on that are
        in the parent.

        They take these args:

        name -- the name of the child, this is what it will be accessed by
        xpath -- the xpath of the child, found same way as above
        type -- whether its a click or hover thing

        then, you make a list of them

        see others as an example

        And thats it!
        })


*/
