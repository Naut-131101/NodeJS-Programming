// // NOTE: Bài tập 1 – Type Inference
// let x = 42; // kieu number
// let y = "Latte"; // kieu string
// let z = [1, false, "ts"]; // kieeu (number | boolean | string)[]
// let k = { active: true }; // kieu boolean 
// let m = [9]; // kieu number[]
// let p; // kieu any
// let q = []; // kieu any[]
const john = {
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
        return (this.baseSalary * hours + this.baseSalary * overtimeHours * 1.5);
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
export {};
