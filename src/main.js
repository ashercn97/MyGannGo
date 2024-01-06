import get_assignment_center from './utils/assignments.js';
import get_cookies from './utils/cookies.js';
import login from './utils/login.js';



const assigned = await get_assignment_center({ log: true, headless: true,  });