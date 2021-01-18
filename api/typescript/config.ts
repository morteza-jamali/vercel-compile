export default function config(tsc: any) {
  return (config: any = {}) => {
    return {
      compilerOptions: {
        module: tsc.ModuleKind.CommonJS,
      },
    };
  };
}
