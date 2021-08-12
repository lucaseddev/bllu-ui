export function isFunction(func: any) {
  return func && {}.toString.call(func) === "[object Function]";
}
