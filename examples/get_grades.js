import get_cookies from '../src/utils/cookies.js';
import {NavNested} from '../src/utils/nav_models.js';
import login from '../src/utils/login.js';


/*

    this example is way more complicated, and actually involves
    some coding. Here you will get your grade in a class, as well as 
    the points you got and total points. It calls two mygann apis, and yeah.

    It is pretty fun tho! It uses nav, cookies, and login.


*/
const main = async () => {
    const [page, browser] = await login({testing: false, headless: true});
    const navConfig = {page, log: true, test: false, browser};
    const navNested = new NavNested(navConfig);

    await navNested.my_profile.run("Profile")

    await page.waitForTimeout(3000);
    var current_url = await page.evaluate(() => window.location.href);
    current_url = current_url.toString(); 
    const split_url = current_url.split("/");
    const student_id = split_url[split_url.length - 2];
    console.log("STUDENT ID: ", student_id);
    const cookies =  await get_cookies({log: true, headless: true, stringify: true})

    const classes = await fetch(`https://gannacademy.myschoolapp.com/api/datadirect/ParentStudentUserAcademicGroupsGet?userId=${student_id}&schoolYearLabel=2023%20-%202024&memberLevel=3&persona=2&durationList=151463&markingPeriodId=&viewCid=view117&parentViewCid=view62&changeSchoolYearCount=1`, {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,la;q=0.8",
          "requestverificationtoken": "pMiYlR0SkyYPETX7ITZTiQpsDfkcqdZxtKqu_FRyaibextSJ4wXS-l7we4A4BEmJv6zsBKTV5ryn-xujEZeElcQH6UKhRNO0fX7jstrCRk41 65d14fc4-29df-4033-b8e5-ee5178c69505",
          "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "wh-version": "1.52.24008.2",
          "x-requested-with": "XMLHttpRequest",
          "cookie": cookies,
          "Referer": "https://gannacademy.myschoolapp.com/app/student",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });

    const classes_data = await classes.json();
    //console.log(classes_data);
    var classes_parsed = classes_data.map(async item => {
        return {
            class: item.sectionidentifier,
            sectionid: item.sectionid,
            durationid: item.DurationId,
            markingid: item.markingperiodid,
        }
    })

    classes_parsed = await Promise.all(classes_parsed)

    //console.log(classes_parsed)

    for(let i = 0; i < classes_parsed.length; i++) {
    const selected_class = classes_parsed[i]

    if((selected_class.sectionid) && (selected_class.durationid) && (selected_class.markingid)) {

    const sectionid = selected_class.sectionid
    const durationid = selected_class.durationid
    const markingid = selected_class.markingid
    const name = selected_class.class
    

    const response = await fetch(`https://gannacademy.myschoolapp.com/api/datadirect/GradeBookPerformanceAssignmentStudentList/?sectionId=${sectionid}&markingPeriodId=${markingid}&studentUserId=${student_id}&personaId=2`, {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,la;q=0.8",
        "requestverificationtoken": "WU_ex-N7nFlbrrb6hvC9eB6lnpsBkvof4vkBofKSaOzzt7B46v_0wtZXhtEAwcKB0OEUlMOEpEknwsaIp9vwSM_3MoelylNsT9ScGWSeMFo1 65d14fc4-29df-4033-b8e5-ee5178c69505",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "wh-version": "1.52.24008.2",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookies,
        "Referer": "https://gannacademy.myschoolapp.com/app/student",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
    });

    const data = await response.json();
    //console.log(data);

    let recieved = 0
    let total = 0

    const parsed = await data.map(async (item) => {
        recieved += parseInt(item.Points);
        total += item.MaxPoints;
    })

    //console.log("GOT: ", recieved, "TOTAL :", total)
    //console.log(recieved/total)

    console.log(`
    REPORT:
    Class: ${name}
    You recieved: ${recieved} points
    Out of: ${total} points
    You have a ${(recieved/total) * 100}% in this class
    Good job!
    `)
    }
}
    }

main()