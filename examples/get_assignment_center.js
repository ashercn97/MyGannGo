/*
    In this example, you can see how to get assignment center assignments.
    They are already parsed into a json object containing the following:

    className
    assignmentName 
    dueDate


*/

import get_assignment_center from "../src/utils/assignments";

// log: basically asks if you want to see all the random stuff I console log
// could be interesting i guess
// headless: if you want an actual browser to pop up haha
const assignments = await get_assignment_center({ log: true, headless: true });

console.log("Here are all the assignments you are putting off :-)")
console.log("ASSIGNMENTS: ", assignments)