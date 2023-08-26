export const toISOString = (date: { toISOString: () => any; }) => date.toISOString();
export const stringToDate = (dateString: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: (str: any) => number): [any, any, any]; new(): any; }; }; }) => {
    const [month, day, year] = dateString.split('-').map(str => parseInt(str, 10));
    return new Date(year, month - 1, day);
};
