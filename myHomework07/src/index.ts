type CamelCase<T extends string> =
  T extends `${infer Head}_${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
    : Lowercase<T>;

type CamelCase1 = CamelCase<"hello_world_with_types">;
// "helloWorldWithTypes"

type CamelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">;
// "helloWorldWithTypes"