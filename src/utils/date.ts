import { CustomError } from "../errors/custom.error";

export const newDateF = (date: Date): string => {
    
    if(!date) throw new CustomError("Date is required", 400)
    
    if(!(date instanceof Date)) throw new CustomError("Date must be Date instance of", 400)

    const day =
        date.getDate().toString().length === 1
            ? `0${date.getDate()}`
            : `${date.getDate()}`;

    const month =
        `${date.getMonth()}`.length === 1
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;

    const year = `${date.getFullYear()}`;

    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    //return `${day}/${month}/${year}T${h}:${m}:${s}`;
    return `${year}-${month}-${day}T${h}:${m}:${s}`

};
