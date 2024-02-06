export const newDateF = (): string => {
    const date = new Date();

    const day =
        date.getDate().toString().length === 1
            ? `0${date.getDate()}`
            : `${date.getDate()}`;

    const month =
        `${date.getMonth()}`.length === 1
            ? `0${date.getMonth()}`
            : `${date.getMonth()}`;

    const year = `${date.getFullYear()}`;

    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    return `${day}/${month}/${year}T${h}:${m}:${s}`;
};
