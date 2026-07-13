"use strict";
// NOTE: Exercise 1
function echo(arg) {
    return arg;
}
const a = echo("hello");
const b = echo(42);
function printName(obj) {
    console.log(obj.name);
}
printName({ name: "John", age: 30 });
// NOTE: Exercise 3
class Entity {
    id;
    constructor(id) {
        this.id = id;
    }
}
const numberEntity = new Entity(1);
const stringEntity = new Entity("guid-1234");
// UserKeys chỉ nhận được đúng 2 giá trị: "userId" hoặc "username"
// keyof User lấy toàn bộ tên property của User rồi tạo thành union type gồm các string literal đó.
// Một giá trị không phải tên property của User không thể gán cho UserKeys, TypeScript sẽ báo lỗi Type '"email"' is not assignable to type 'UserKeys'.
