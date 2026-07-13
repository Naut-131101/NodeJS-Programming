type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

const fn = (v: boolean) => {
  if (v) {
    return 1;
  } else {
    return 2;
  }
};

type Result = MyReturnType<typeof fn>; // 1 | 2
const result: Result = 1;