export const sum = (items: number[]) => items.reduce((a, b) => a + b);
export const average = (items: number[]) => sum(items) / items.length;
export const equallyDividedSlice = (items: number[], length: number) => {
  const cnt = Math.ceil(items.length / length);
  return [...Array(cnt)].map((_, i) => {
    const offset = i * length;
    return items.slice(offset, offset + length);
  });
};
