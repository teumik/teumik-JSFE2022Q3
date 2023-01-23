export const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

export const remove = <T>(arr: Array<T>, item: T) => {
  const index = arr.findIndex((el) => el === item);
  if (index === -1) return;
  arr.splice(index, 1);
};
