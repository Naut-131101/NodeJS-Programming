// NOTE: Exercise 1
function echo<T>(arg: T): T {
  return arg;
}

const a = echo("hello");
const b = echo(42);

// NOTE: Exercise 2
interface Name {
  name: string;
}

function printName<T extends Name>(obj: T): void {
  console.log(obj.name);
}

printName({ name: "John", age: 30 });

// NOTE: Exercise 3
class Entity<T> {
  id: T;

  constructor(id: T) {
    this.id = id;
  }
}

const numberEntity = new Entity<number>(1);
const stringEntity = new Entity<string>("guid-1234");

// NOTE: Exercise 4
interface User {
  userId: number;
  username: string;
}

type UserKeys = keyof User; // "userId" | "username"
// UserKeys chỉ nhận được đúng 2 giá trị: "userId" hoặc "username"
// keyof User lấy toàn bộ tên property của User rồi tạo thành union type gồm các string literal đó.
// Một giá trị không phải tên property của User không thể gán cho UserKeys, TypeScript sẽ báo lỗi Type '"email"' is not assignable to type 'UserKeys'.