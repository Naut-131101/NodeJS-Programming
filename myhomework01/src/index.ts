// // NOTE: Bài tập 1 – Type Inference
// let x = 42; // kieu number
// let y = "Latte"; // kieu string
// let z = [1, false, "ts"]; // kieeu (number | boolean | string)[]
// let k = { active: true }; // kieu boolean 
// let m = [9]; // kieu number[]
// let p; // kieu any
// let q = []; // kieu any[]

// // NOTE: Bài tập 2 – Kiểm tra đối tượng
// type Account = {
//   id: number;
//   username: string;
//   isAdmin: boolean;
// };

// let account: Account = {
//   id: 1,
//   username: "Tuan",
// }; 
// // Đối tượng account thiếu (property bắt buộc trong type Account) isAdmin nên lỗi

// // NOTE: Bài tập 3
// type Product = [id: number, name: string, price: number];
// const product: Product = ["Laptop", 1, 1000];
// // Lỗi: Type 'string' is not assignable to type 'number'.

// // NOTE: Bài tập 4
// enum OrderStatus {
//   Pending,
//   Shipped,
//   Delivered,
//   Cancelled,
// }

// let status: OrderStatus;
// status = "Done";
// // Type 'Done' khong khop voi type trong 'OrderStatus'.

// // NOTE: Bài tập 5
// function computeTotal(price: number, tax: number): number {}
// // "Function lacks ending return statement and return type does not include 'undefined'."

// // NOTE: Bài tập 6
// function log(value) {
//   console.log(value);
// }
// // Parameter 'value' implicitly has an 'any' type.

// function log(value: number): void {
//   console.log(value);
// }

// // NOTE: Bài tập 7
// function greet(name: string) {
//   let age = 20;
//   console.log("Hello");
// }
// // 'name' is declared but its value is never read.
// // 'age' is declared but its value is never read.

// // NOTE: Bài tập 8
// let amounts: number[] = [200, 400, 600];
// amounts[1] = "300"; // Type 'string' is not assignable to type 'number'.

// // NOTE: Bài tập 9
// type Employee = {
//   id: number;
//   name: string;
//   retired: (date: Date) => void;
// };

// const employee: Employee = {
//   id: 1,
//   name: "Michael Jordan",
//   retired(date: Date) {
//     console.log(`An employee is ${this.name} has been retired in ${date.toLocaleDateString("vi-VN")}.`);
//   },
// };

// employee.retired(); // Expected 1 arguments, but got 0. An argument for 'date' was not provided.
// employee.retired(new Date("01-01-2025"));

// NOTE: Bài tập 10
type Department = "IT" | "HR" | "Finance" | "Marketing";

type Address = {
  street: string;
  city: string;
  country: string;
};
type Employee = {
  readonly id: number;
  name: string;
  department: Department;
  email?: string;
  address: Address;
  baseSalary: number;
  isActive: boolean;

  computeSalary: (
    hours: number,
    overtimeHours?: number
  ) => number;
  updateDepartment: (
    newDepartment: Department
  ) => void;
  getInfo: () => string;
};

const john: Employee = {
  id: 1,
  name: "John Doe",
  department: "IT",
  email: "john@gmail.com",
  address: {
    street: "123 Nguyen Trai",
    city: "Ho Chi Minh",
    country: "Vietnam",
  },
  baseSalary: 100000,
  isActive: true,

  computeSalary(hours, overtimeHours = 0) {
    return (
      this.baseSalary * hours + this.baseSalary * overtimeHours * 1.5
    );
  },

  updateDepartment(newDepartment) {
    this.department = newDepartment;
  },

  getInfo() {
    return `
      ID: ${this.id}
      Name: ${this.name}
      Department: ${this.department}
      Email: ${this.email}
      Address: ${this.address.street}, ${this.address.city}, ${this.address.country}
      Status: ${this.isActive ? "Active" : "Inactive"}
    `;
  },
};

console.log(john.getInfo());
console.log("Salary:", john.computeSalary(8));
console.log("Salary OT:", john.computeSalary(8, 2));

john.updateDepartment("Finance");
console.log(john.department);