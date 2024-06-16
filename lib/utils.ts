
export const debounce = (func: any, delay: number) => {
  let timeoutId: any;
  const debouncedFunc = (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(args);
    }, delay);
  };

  debouncedFunc.cancel = () => {
    clearTimeout(timeoutId)
  }
  return debouncedFunc;
}
