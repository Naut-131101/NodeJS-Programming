declare class Logger {
    private fileName;
    constructor(fileName: string);
    writeMessage(message: string): void;
}
declare const logger: Logger;
declare class Person {
    firstName: string;
    lastName: string;
    constructor(firstName: string, lastName: string);
    get fullName(): string;
}
declare const person: Person;
declare class Employee extends Person {
    salary: number;
    constructor(firstName: string, lastName: string, salary: number);
}
declare const employee: Employee;
declare class Animal {
    private name;
    show(): void;
}
declare class Cat extends Animal {
    print(): void;
}
declare class Human {
    protected name: string;
}
declare class Male extends Human {
    print(): void;
}
declare const male: Male;
interface Address {
    street: string;
    city: string;
    zipCode: number;
}
interface EmployeeInfo {
    name: string;
    salary: number;
    address: Address;
}
declare let employees: EmployeeInfo;
//# sourceMappingURL=index.d.ts.map