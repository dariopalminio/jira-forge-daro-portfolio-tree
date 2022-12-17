
const quarterGeneric: string[] = ['Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q3', 'Q3', 'Q3', 'Q4', 'Q4', 'Q4'];


export type QuarterItemType = { quarter: string,  months: Array<MonthItemType>};
export type MonthItemType = { month: number };
export type QuartersType = { [key: string]: Array<MonthItemType> };

const getQuarterObject = (q: string, y: number): QuarterItemType | undefined=> {
    switch (q) {
        case 'Q1': {
            return {
                quarter: y + ' Q1',
                months:
                    [{ month: 1 },
                    { month: 2 },
                    { month: 3 }]
            }
        }
        case 'Q2': {
            return {
                quarter: y + ' Q2',
                months:
                    [{ month: 4 },
                    { month: 5 },
                    { month: 6 }]
            }
        }
        case 'Q3': {
            return {
                quarter: y + ' Q3',
                months:
                    [{ month: 7 },
                    { month: 8 },
                    { month: 9 }]
            }
        }
        case 'Q4': {
            return {
                quarter: y + ' Q4',
                months:
                    [{ month: 10 },
                    { month: 11 },
                    { month: 12 }]
            }
        }
        default:
            return undefined;
    }
};

/**

Example:

getQuarters(new Date('2022-07-28'), new Date('2023-04-20'))

result: { 
  'Q3 2022': [ { month: 7 }, { month: 8 }, { month: 9 } ],
  'Q4 2022': [ { month: 10 }, { month: 11 }, { month: 12 } ],
  'Q1 2023': [ { month: 1 }, { month: 2 }, { month: 3 } ],
  'Q2 2023': [ { month: 4 }, { month: 5 }, { month: 6 } ] 
}

 */
export const getQuarters = (fromDate: Date, toDate: Date) => {
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