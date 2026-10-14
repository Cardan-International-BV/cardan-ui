export function sort(arr: any, prop: string, order = 'asc') {
  const keys = prop.split('.');

  arr?.sort(function (a: any, b: any) {
    for (const key of keys) {
      a = a[key];
      b = b[key];
    }
    if (a < b) {
      return order === 'asc' ? -1 : 1;
    } else if (a > b) {
      return order === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
  return arr;
}
