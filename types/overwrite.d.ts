function parseInt(s: string | number, radix?: number): number;

function parseFloat(string: string | number): number;

type ObjectKeys<T> = T extends object ? (keyof T)[] : T extends number ? [] : T extends Array<any> | string ? string[] : never;

interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
}
