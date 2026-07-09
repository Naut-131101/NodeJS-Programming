interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare var backpack: Backpack<string>;