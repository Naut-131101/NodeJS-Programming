"use strict";
function echo(arg) {
    return arg;
}
function printName(obj) {
    console.log(obj.name);
}
printName({
    name: "John",
    age: 20,
});
printName({
    name: "Alice",
    email: "alice@gmail.com",
});
class Entity {
    id;
    constructor(id) {
        this.id = id;
    }
}
// ID kiểu number
const user = new Entity(1);
// ID kiểu string
const product = new Entity("P001");
console.log(user.id);
console.log(product.id);
let key1 = "userId";
let key2 = "username";
// let key3: UserKeys = "email"; // Lỗi: 'email
