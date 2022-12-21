import { QuarterItemType, QuartersDictionaryType, QuartersType } from "../model/quarter-types";

const QuarterPeerMonth: string[] = ['Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q3', 'Q3', 'Q3', 'Q4', 'Q4', 'Q4'];


/**
 * Get quarter from quarter name and year passed by arguments
 */
const getQuarterObject = (q: string, y: number): QuarterItemType | undefined => {
    switch (q) {
        case 'Q1': {
            return {
                quarter: y + ' Q1',
                months:
                    [{ year: y, month: 1, days:31 },
                    { year: y, month: 2, days:28 },
                    { year: y, month: 3, days:31 }]
            }
        }
        case 'Q2': {
            return {
                quarter: y + ' Q2',
                months:
                    [{ year: y, month: 4, days:30 },
                    { year: y, month: 5, days:31 },
                    { year: y, month: 6, days:31 }]
            }
        }
        case 'Q3': {
            return {
                quarter: y + ' Q3',
                months:
                    [{ year: y, month: 7, days:31 },
                    { year: y, month: 8, days:31 },
                    { year: y, month: 9, days:30 }]
            }
        }
        case 'Q4': {
            return {
                quarter: y + ' Q4',
                months:
                    [{ year: y, month: 10, days:31 },
                    { year: y, month: 11, days:30 },
                    { year: y, month: 12, days:31 }]
            }
        }
        default:
            return undefined;
    }
};

/**

Example:

getQuarters(new Date('2022-07-28'), new Date('2023-04-20'))

getFirstDateFromQuarters = 'Fri Jul 01 2022 00:00:00 GMT-0400 (hora estándar de Chile)'
getLastDateFromQuarters = 'Thu Jun 01 2023 00:00:00 GMT-0400 (hora estándar de Chile)'

result:{
    "2022 Q3": [
        {
            "year": 2022,
            "month": 7
        },
        {
            "year": 2022,
            "month": 8
        },
        {
            "year": 2022,
            "month": 9
        }
    ],
    "2022 Q4": [
        {
            "year": 2022,
            "month": 10
        },
        {
            "year": 2022,
            "month": 11
        },
        {
            "year": 2022,
            "month": 12
        }
    ],
    "2023 Q1": [
        {
            "year": 2023,
            "month": 1
        },
        {
            "year": 2023,
            "month": 2
        },
        {
            "year": 2023,
            "month": 3
        }
    ],
    "2023 Q2": [
        {
            "year": 2023,
            "month": 4
        },
        {
            "year": 2023,
            "month": 5
        },
        {
            "year": 2023,
            "month": 6
        }
    ]
}

 */
const getQuartersDictionary = (fromDate: Date, toDate: Date): QuartersDictionaryType => {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    let quarters: QuartersDictionaryType = {};
    for (let year = fromYear; year <= toYear; year++) {
        let monthNum = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;

        for (; monthNum <= monthLimit; monthNum++) {
            const q = QuarterPeerMonth[monthNum];
            const quarter: QuarterItemType | undefined = getQuarterObject(q, year);
            if (quarter !== undefined) {
                const key: string = quarter.quarter;
                quarters[`${key}`] = quarter.months;
            }
        }
    }
    return quarters;
}

export const getQuarters = (fromDate: Date, toDate: Date): QuartersType => {

    const quarters: QuartersDictionaryType = getQuartersDictionary(fromDate, toDate);

    const quartersData: QuartersType = {
        firstDate: getFirstDateFromQuarters(quarters),
        lastDate: getLastDateFromQuarters(quarters),
        data: quarters
    }

    return quartersData;
}

/**
Iterate Key:

for (const [key, value] of Object.entries(sample)) {
  console.log(key);
}

Iterate values:

for (const [key, value] of Object.entries(sample)) {
  for (let i = 0; i < value.length; i++) {
      console.log(value[i].month);
  }
}

 */

export const getQuartersCount = (quarters: QuartersDictionaryType) => {
    if (!quarters || quarters === undefined || quarters === null || !Object.entries(quarters)) {
        return 0;
    }
    return Object.entries(quarters).length;
};

export const getFirstDateFromQuarters = (quarters: QuartersDictionaryType): Date => {
    let firstDate = new Date();
    for (const [key, value] of Object.entries(quarters)) {
        for (let i = 0; i < value.length; i++) {
            const month = value[i].month;
            const year = value[i].year;
            var day = new Date(year, month - 1, 1);
            if (day.getTime() <= firstDate.getTime()) {
                firstDate = day;
            }
        }
    }
    return firstDate;
};

export const getLastDateFromQuarters = (quarters: QuartersDictionaryType): Date => {
    let firstDate = new Date();
    for (const [key, value] of Object.entries(quarters)) {
        for (let i = 0; i < value.length; i++) {
            const month = value[i].month;
            const year = value[i].year;
            var day = new Date(year, month - 1, 1);
            if (day.getTime() >= firstDate.getTime()) {
                firstDate = day;
            }
        }
    }
    return firstDate;
};