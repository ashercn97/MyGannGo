import date_form from "./today.js";
import get_cookies from "./cookies.js";


/*
    takes parameters:
        user_date: either -1 meaning today, or a string like "1/8/2024"
        log: whether you want to log different stages throughout
        headless: whether you want to run headless or not



*/

const get_schedule = async ({user_date = -1, log = false, headless = true}) => {
    const date = date_form({user_date: user_date});

    const cookies = await get_cookies({log: log, headless: headless, stringify: true}); // stringify b/c it needs it for the header

    const res = await fetch("http://localhost:3000/api/schedule/?scheduleDate=1%2F8%2F2024&personaId=2", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,la;q=0.8",
          "requestverificationtoken": "NLV2acsGuGFvT6b-ADjJbM0uotbZEYoB_vwrCAebIon4kLgohbSoIgq_05pexJGqHXrD6_p7wP2dUBii4YOuZWRA1dutYyCvvbDzKHIm25Y1 65d14fc4-29df-4033-b8e5-ee5178c69505",
          "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "wh-version": "1.52.23352.2",
          "x-requested-with": "XMLHttpRequest",
          "cookie": cookies,
          "Referer": "https://gannacademy.myschoolapp.com/app/student",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });

    if(log) {
        console.log("raw response: ", res)
    }

    const json = await res.json();

    const parsedPromises = await json.map(async (item) => {
        return {
            class: item.CourseTitle,
            start: item.StartTime,
            end: item.EndTime,
        }
    });

    const parsed = await Promise.all(parsedPromises);

    if(log) {
        console.log("parsed: ", parsed)
    }

    return parsed;
}

export default get_schedule;