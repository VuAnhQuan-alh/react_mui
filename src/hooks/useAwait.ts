export const Await = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, delay);
  });
};
