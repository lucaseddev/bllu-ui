export function isFunction(func: any) {
  return func && {}.toString.call(func) === "[object Function]";
}

export function isObject(obj: any) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

export function isString(value: any) {
  return (
    value && (typeof value === "string" || value instanceof String)
  );
}

export function isNumber(value: any): boolean {
  return value && !isNaN(value);
}
