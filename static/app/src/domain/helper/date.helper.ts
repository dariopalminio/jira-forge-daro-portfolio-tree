export function isStringIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d: Date = new Date(str);
    return d instanceof Date && d.toISOString() === str; // valid date 
}

export const convertAnyToDate = (d: any): Date => {
    if (d instanceof Date) { //typeof: object
        return d;
    };
    //ISOString
    if (typeof d === "string") { //typeof: string
        return new Date(d);
    }
    throw new Error('Could not convert data to date');
};

const formatTo = (date: Date, lang: string, sep: string = '/') => {
    let d = new Date();
    if (!(date instanceof Date) || (typeof date === "string")) { //typeof: object
        d = new Date(date);
    } else {
        d = date;
    };
    if (!(d instanceof Date)) {
        return date; //Do nothing
    }

    if (lang === 'es') {
        return d.getDate() + sep + (d.getMonth() + 1) + sep + d.getFullYear();
    }
    //lang='en' or other
    return d.getFullYear() + sep + (d.getMonth() + 1) + sep + d.getDate();
}

function getMonthDifference(startDate: Date, endDate: Date) {
    const difference = (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
    )
    return difference;
}

/**
 * 
 * @param fromDate 
 * @param toDate 
 * @returns example
 * [ { year: 2022, month: 7 },
 * { year: 2022, month: 8 },
 * { year: 2022, month: 9 },
 * { year: 2022, month: 10 },
 * { year: 2022, month: 11 },
 * { year: 2022, month: 12 },
 * { year: 2023, month: 1 },
 * { year: 2023, month: 2 },
 * { year: 2023, month: 3 } ]
 */
const getMonthsBetweenTwoDates = (fromDate: Date, toDate: Date) => {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    const months = [];

    for (let year = fromYear; year <= toYear; year++) {
        let monthNum = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;

        for (; monthNum <= monthLimit; monthNum++) {
            let month = monthNum + 1;
            months.push({ year, month });
        }
    }
    return months;
}


