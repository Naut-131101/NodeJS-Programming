// interface User {
//   fullNames: string;
//   id: number;
// }

// function deleteUser(user: User) {}

// /**
//  * Phan moi so voi js
//  */
// function getUserProfile(): User {
//     return {
//         fullNames: "Julius Ceasar",
//         id: 1
//     };
// }

// deleteUser({ fullNames: "Julius Ceasar", id: 1 });

// class UserAccount implements User {
//     constructor(public fullNames: string, public id: number) {}
// }

// const user: User = new UserAccount("Julius Ceasar", 125);
// console.log(user);

// type MixedType = string | number | boolean;

// let x: MixedType = "Hello";
// x = 100;
// x = true;

// function getLength(obj: string | string[]): number {
//     return obj.length;
// }

// console.log(getLength("Humble"));
// console.log(getLength(["Humble", "Julius", "Ceasar"]));

// function wrapInArray(obj: string | string[]) {
//     if (typeof obj === "string") {
//         return [obj];
//     } else {
//         return obj;
//     }

//     // return Array.isArray(obj) ? obj : [obj];
// }

// console.log(wrapInArray(["Humble", "Julius", "Ceasar"]));

// function printValue(obj: string | number) {
//     if (typeof obj === "string") {
//         console.log(obj.toUpperCase());
//     } else {
//         console.log(obj.toFixed(2));
//     }
// }

// printValue("hello");
// printValue(1);







// type StringArray = Array<string>;
// type NumberArray = Array<number>;
// type ObjectWithNameArray = Array<{ name: string }>;

// const fruits: StringArray = ["Apple", "Banana", "Cherry"];
// const nums: NumberArray = [10, 20, 30];
// const students: ObjectWithNameArray = [
//   { name: "Mario" },
//   { name: "Luigi" },
//   { name: "Peach" },
// ];





// interface Backpack<Type> {
//   add: (obj: Type) => void;
//   get: () => Type;
// }

// class MyBackpack<Type> implements Backpack<Type> {
//     private item!: Type;

//     add(obj: Type) : void {
//         this.item = obj;
//     }

//     get() : Type {
//         return this.item;
//     }
// }

// const myBackpack = new MyBackpack<string>();



// import "./backpack-runtime";

// backpack.add("Macbook");

// const object = backpack.get();
// console.log(object);

// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//     res.send("Hi, world!");
// });

// app.listen(9999);





// function greet(person, date) {
//     console.log(`Hello ${person}, today is ${date}!`);
// }
// greet("Tuan");




// function greet(person: string, date: Date) {
//     console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Tuan", new Date());




// function findUserName(id: number): string | undefined {
//     if (id === 1) {
//         return "Alice";
//     }
//     return undefined;
// }

// const userName = findUserName(1 /*2*/);
// console.log(userName!.toUpperCase());




// const fruits = ["Apple", "Banana", "Cherry"];
// fruits.forEach((fruit) => console.log(fruit.toUpperCase()));


// WARNINGNOTE
// function printCoords(coordinate: { x: number; y: number }): void {
//     document.getElementById("latitude")!.textContent = coordinate.x.toString();
//     document.getElementById("longitude")!.textContent = coordinate.y.toString();
// }

// function getCoords(): void {
//     navigator.geolocation.getCurrentPosition((position) => {
//         printCoords({x: position.coords.latitude, y: position.coords.longitude});
//     });
// }

// getCoords();




// function printCoords(coordinate: { x: number; y?: number }): void {
//     document.getElementById("latitude")!.textContent = coordinate.x.toString();
//     if (coordinate.y !== undefined) {
//         document.getElementById("longitude")!.textContent = coordinate.y.toString();
//     } else {
//         document.getElementById("longitude")!.textContent = "Longitude is undefined";
//     }
// }

// function getCoords(): void {
//     navigator.geolocation.getCurrentPosition((position) => {
//         printCoords({x: position.coords.latitude, y: position.coords.longitude});
//     });
// }

// getCoords();





// function getMe(person: { name: string; age?: number}) {
//     console.log(person.name.toUpperCase());
//     console.log(person.age?.toFixed(2));
// }

// getMe({ name: "Tuan", age: 30 });
// getMe({ name: "Tuan" });




// declare function getBear(): Bear;

// interface Animal {
//     name: string;
// }

// interface Bear extends Animal {
//     honey: boolean;
// }

// const bear = getBear();
// bear.name;
// bear.honey;



// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// const ctx = myCanvas.getContext("2d");
// ctx!.fillStyle = "deeppink";
// ctx!.strokeStyle = "dodgerblue";
// ctx!.lineWidth = 3;

// ctx!.fillRect(10, 10, 100, 100);
// ctx!.strokeRect(10, 10, 100, 100);

// ctx!.beginPath();
// ctx!.arc(110, 110, 55, 0, Math.PI * 2, false);
// ctx!.stroke();





declare function handleRequest(
    url: string,
    method: "GET" | "POST"
): void;

const req = {
    url: "https://example.com",
    method: "GET",
} as const;

handleRequest(req.url, req.method);