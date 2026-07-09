"use strict";
let item;
globalThis.backpack = {
    add: (obj) => {
        item = obj;
    },
    get: () => {
        return item;
    }
};
