declare module "cli-color" {
  type ColorFunction = (text: string) => string;

  interface Colors {
    red: ColorFunction;
    yellow: ColorFunction;
    green: ColorFunction;
    cyan: ColorFunction;
    magenta: ColorFunction;
    blue: ColorFunction;
  }

  const clc: Colors;
  export = clc;
}
