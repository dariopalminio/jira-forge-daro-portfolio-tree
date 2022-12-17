
const quarterGeneric: string[] = ['Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q3', 'Q3', 'Q3', 'Q4', 'Q4', 'Q4'];


export type QuarterItemType = { quarter: string,  months: Array<MonthItemType>};
export type MonthItemType = { year: number, month: number };
export type QuartersType = { [key: string]: Array<MonthItemType> };

const getQuarterObject = (q: string, y: number): QuarterItemType | undefined=> {
    switch (q) {
        case 'Q1': {
            return {
                quarter: y + ' Q1',
                months:
                    [{ year: y, month: 1 },
                    { year: y, month: 2 },
                    { year: y, month: 3 }]
            }
        }
        case 'Q2': {
            return {
                quarter: y + ' Q2',
                months:
                    [{ year: y, month: 4 },
                    { year: y, month: 5 },
                    { year: y, month: 6 }]
            }
        }
        case 'Q3': {
            return {
                quarter: y + ' Q3',
                months:
                    [{ year: y, month: 7 },
                    { year: y, month: 8 },
                    { year: y, month: 9 }]
            }
        }
        case 'Q4': {
            return {
                quarter: y + ' Q4',
                months:
                    [{ year: y, month: 10 },
                    { year: y, month: 11 },
                    { year: y, month: 12 }]
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
export const getQuarters = (fromDate: Date, toDate: Date): QuartersType => {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    let quarters: QuartersType = {};
    for (let year = fromYear; year <= toYear; year++) {
        let monthNum = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;

        for (; monthNum <= monthLimit; monthNum++) {
            const q = quarterGeneric[monthNum];
            const quarter: QuarterItemType | undefined = getQuarterObject(q, year);
            if (quarter !== undefined) {
                const key: string = quarter.quarter;
                quarters[`${key}`] = quarter.months;
            }
        }
    }
    return quarters;
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

export const getQuartersCount = (quarters: QuartersType) => {
    if (!quarters || quarters === undefined || quarters === null || !Object.entries(quarters)){
        return 0;
    }
      return Object.entries(quarters).length;
};

export const getFirstDateFromQuarters = (quarters: QuartersType): Date => {
    let firstDate = new Date();
    for (const [key, value] of Object.entries(quarters)) {
        for (let i = 0; i < value.length; i++) {
            const month = value[i].month;
            const year = value[i].year;
            var day = new Date(year, month-1, 1);
            if (day.getTime() <= firstDate.getTime()){
                firstDate = day;
            }
        }
      }
      return firstDate;
};

export const getLastDateFromQuarters = (quarters: QuartersType): Date => {
    let firstDate = new Date();
    for (const [key, value] of Object.entries(quarters)) {
        for (let i = 0; i < value.length; i++) {
            const month = value[i].month;
            const year = value[i].year;
            var day = new Date(year, month-1, 1);
            if (day.getTime() >= firstDate.getTime()){
                firstDate = day;
            }
        }
      }
      return firstDate;
};