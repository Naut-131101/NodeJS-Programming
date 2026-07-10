"use strict";
class Logger {
    fileName;
    constructor(fileName) {
        this.fileName = fileName;
    }
    writeMessage(message) {
        console.log(`Write to ${this.fileName}: ${message}`);
    }
}
const logger = new Logger("log.txt");
logger.writeMessage("Program started.");
class Person {
    firstName;
    lastName;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
const person = new Person("John", "Smith");
class Employee extends Person {
    salary;
    constructor(firstName, lastName, salary) {
        super(firstName, lastName);
        this.salary = salary;
    }
}
const employee = new Employee("John", "Smith", 50000);
console.log(employee.fullName + ": " + employee.salary);
class Animal {
    name = "Dog";
    show() {
        console.log(this.name);
    }
}
class Cat extends Animal {
    print() {
        // console.log(this.name); // Error
    }
}
class Human {
    name = "Dog";
}
class Male extends Human {
    print() {
        console.log(this.name);
    }
}
const male = new Male();
let employees = {
    name: "John Smith",
    salary: 50000,
    address: {
        street: "Flinders st",
        city: "Melbourne",
        zipCode: 3144,
    },
};
console.log(employees);
