
export type QuarterItemType = {
    quarter: string,
    months: Array<MonthItemType>
};

export type MonthItemType = {
    year: number;
    month: number;
    days: number;
};

export type QuartersDictionaryType = {
    [key: string]: Array<MonthItemType>
};

export type QuartersType = {
    firstDate: Date;
    lastDate: Date;
    data: QuartersDictionaryType
};

export const QuartersDefault: QuartersType = {
    firstDate: new Date(),
    lastDate: new Date(),
    data: {}
};
