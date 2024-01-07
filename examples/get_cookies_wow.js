/*
    In this example you can see how to get the cookies from your account
    I actually used this kind of thing in a project I made!

    Remember to copy the config_template.js into 
    config.js and fill in the values :-)


*/
import get_cookies from "../src/utils/cookies.js";

/*
    log: same as before, basicallly asks if you want to see all the random
    stuff I console log for debugging. It could be helpful if u wanna see what ur 
    doing

    headless: if you want a browser window popped up 

    stringify: if you want the cookies to be returned as a string
    this string is useful for mygann API requests
    bc they always want my damn cookies!




*/
const cookies = await get_cookies({ log: true, headless: true, stringify: true });

console.log("I baked you some cookies :-) -", cookies)
