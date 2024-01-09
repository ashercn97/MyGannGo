
/*

    takes date:
    if date is -1 it means today, otherwise intput something like:

    "1/6/2024" (the day i made this)
*/
export default function date_form({user_date = -1}) {
    let month, day, year
    if(user_date === -1) {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds leading zero if needed
        const day = String(date.getDate()).padStart(2, '0');        // Adds leading zero if needed
        const year = date.getFullYear();
    } else {
        const date = new Date(user_date);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds leading zero if needed
        const day = String(date.getDate()).padStart(2, '0');        // Adds leading zero if needed
        const year = date.getFullYear();
    }

    return `${month}%2F${day}%2F${year}`;    
}