import get_schedule from '../src/utils/schedule.js';

const schedule = await get_schedule({log: true, headless: true, user_date: "1/8/2024"});

console.log("schedule: ", schedule);