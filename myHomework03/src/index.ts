// // NOTE: Exercise 1
// class Logger {
//   private fileName: string;

//   constructor(fileName: string) {
//     this.fileName = fileName;
//   }

//   writeMessage(message: string): void {
//     console.log(`Write to ${this.fileName}: ${message}`);
//   }
// }

// const logger = new Logger("log.txt");
// logger.writeMessage("Program started.");

// // NOTE: Exercise 2
// class Person {
//   constructor(public firstName: string, public lastName: string) {}

//   get fullName(): string {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }

// const person = new Person("Michael", "Jordan");
// console.log(person.fullName); // "Michael Jordan"

// // NOTE: Exercise 3
// class Employee extends Person {
//   constructor(firstName: string, lastName: string, public salary: number) {
//     super(firstName, lastName);
//   }
// }

// const emp = new Employee("Michael", "Jordan", 50000);
// console.log(emp.fullName, emp.salary);

// // NOTE: Exercise 4
// class Animal {
//   private name: string;
//   protected sound: string;

//   constructor(name: string, sound: string) {
//     this.name = name;
//     this.sound = sound;
//   }

//   // Ví dụ 1: 'name' là private, chỉ dùng được trong chính class Animal
//   describe(): string {
//     return `${this.name} makes ${this.sound}`;
//   }
// }

// class Dog extends Animal {
//   bark(): string {
//     // Ví dụ 2: 'sound' là protected -> truy cập được trong class con
//     return `Woof! ${this.sound}`;
//     // this.name -> Lỗi: 'name' is private and only accessible within class 'Animal'.
//   }
// }

// const dog = new Dog("Rex", "Bark");
// console.log(dog.describe());
// // dog.sound -> Lỗi: 'sound' is protected, không truy cập được từ bên ngoài class.

// // Ví dụ 3: protected cho phép class con khác cũng dùng được
// class Cat extends Animal {
//   constructor(name: string) {
//     super(name, "Meow");
//   }
//   makeSound(): string {
//     return this.sound; // OK vì protected
//   }
// }

// NOTE: Exercise 5
interface Address {
  street: string;
  city: string;
  zipCode: number;
}

interface Employee {
  name: string;
  salary: number;
  address: Address;
}

let employee: Employee = {
  name: "John Smith",
  salary: 50_000,
  address: {
    street: "Flinders st",
    city: "Melbourne",
    zipCode: 3144,
  },
};

console.log(employee);