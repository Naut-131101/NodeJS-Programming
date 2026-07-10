declare function echo<T>(arg: T): T;
declare function printName<T extends {
    name: string;
}>(obj: T): void;
declare class Entity<T> {
    id: T;
    constructor(id: T);
}
declare const user: Entity<number>;
declare const product: Entity<string>;
interface User {
    userId: number;
    username: string;
}
type UserKeys = keyof User;
declare let key1: UserKeys;
declare let key2: UserKeys;
//# sourceMappingURL=index.d.ts.map