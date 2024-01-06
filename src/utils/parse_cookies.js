
export const parse_cookies = (cookjs) => {
    var cookies = {};
    cookjs.map(cookie => {
        cookies[cookie.name] = cookie.value;
    });
    return cookies;
}

export const make_cookie_string = (cookies) => {
    var cookie_string = "";
    Object.keys(cookies).forEach(key => {
        cookie_string += `${key}=${cookies[key]}; `;
    });
    return cookie_string;
}

export function orderCookies(cookiesJson, order = [
    "__RequestVerificationToken_OnSuite",
    "__RequestVerificationToken_OnSuite_TokenId",
    "sd",
    "ck",
    "bridge",
    "persona",
    "s",
    "mp_c7c28944e829e2d63378894603986970_mixpanel",
    "t",
    "userDataSessionID",
    "AuthSvcToken"
]) {
    // Create a map of cookies for quick access
    const cookieMap = new Map(cookiesJson.map(cookie => [cookie.name, cookie.value]));

    // Order and format the cookies based on the provided order array
    return order.map(cookieName => {
        if (cookieMap.has(cookieName)) {
            return `${cookieName}=${cookieMap.get(cookieName)}`;
        }
        return ''; // If a cookie is not found, return an empty string (or handle as needed)
    }).filter(cookie => cookie !== '').join('; ');
}

// Define the order based on your string
const order = [
    "__RequestVerificationToken_OnSuite",
    "__RequestVerificationToken_OnSuite_TokenId",
    "sd",
    "ck",
    "bridge",
    "persona",
    "s",
    "mp_c7c28944e829e2d63378894603986970_mixpanel",
    "t",
    "userDataSessionID",
    "AuthSvcToken"
];
