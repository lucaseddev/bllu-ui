export function isFunction(func: any) {
  return func && {}.toString.call(func) === "[object Function]";
}

export function isObject(obj: any) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}
