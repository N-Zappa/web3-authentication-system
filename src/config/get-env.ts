export const getEnv = (name: string) => {
  if (!process.env[name]) throw new Error(`${name} is not found`);
  return process.env[name]!;
};
