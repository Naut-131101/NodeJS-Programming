function echo<T>(arg: T): T {
  return arg;
}

function printName<T extends { name: string }>(obj: T): void {
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

class Entity<T> {
  constructor(public id: T) {}
}

// ID kiểu number
const user = new Entity<number>(1);

// ID kiểu string
const product = new Entity<string>("P001");

console.log(user.id);
console.log(product.id);

interface User {
  userId: number;
  username: string;
}

type UserKeys = keyof User;
let key1: UserKeys = "userId";
let key2: UserKeys = "username";
// let key3: UserKeys = "email"; // Lỗi: 'email

