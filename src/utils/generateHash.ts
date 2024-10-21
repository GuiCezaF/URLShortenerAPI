export const generateHash = (input: string): number => {
  let hash = 5381;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i);
  }

  return hash >>> 0;
};
