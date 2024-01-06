import get_cookies from './cookies.js';

export default async function get_assignment_center({ log=true, headless=true}) {
    const cookies = await get_cookies({ log: log, stringify: true, headless: headless });

    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds leading zero if needed
    const day = String(date.getDate()).padStart(2, '0');        // Adds leading zero if needed
    const year = date.getFullYear();

    const forDate = `${month}%2F${day}%2F${year}`; // URL encoding for the date (MM/DD/YYYY)


    const res = await fetch(`https://gannacademy.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&filter=2&dateStart=${forDate}&dateEnd=${forDate}&persona=2&statusList=&sectionList=`, {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,la;q=0.8",
          "requestverificationtoken": "3EDlJO6kz2CbL-6wdxH5GM0G8SafY5f8Zh8wb76_ph1WJs5k0pOe_oo2rhxi9eMHvvJgLpAXiAW46wI8yQtHcl9N-U7sh4CZyzsD_fvSoJY1 65d14fc4-29df-4033-b8e5-ee5178c69505",
          "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "wh-version": "1.52.23352.2",
          "x-requested-with": "XMLHttpRequest",
          "cookie": cookies,
        },
        "referrer": "https://gannacademy.myschoolapp.com/app/student",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });
    




          

    console.log("RES: ", res)
    const json = await res.json();
    console.log(json)
    const parsedAssignmentPromises = await json.map(async assignment => {
        return {
            className: assignment.groupname,
            assignmentName: assignment.short_description,
            dueDate: assignment.date_due,
        }
    })

    const parsedAssignments = await Promise.all(parsedAssignmentPromises);

    if(log) {
        console.log("Assignments: ", parsedAssignments);
    }

    return parsedAssignments;

}

