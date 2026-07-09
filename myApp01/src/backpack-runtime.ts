let item: string;

globalThis.backpack = {
    add: (obj: string) : void => {
        item = obj;
    },

    get: () : string => {
        return item;
    }
}