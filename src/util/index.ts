/* acts like numpy.randint()
    randInt(n) returns a random integer between 0 (incl) and n (excl)
    randINt(n, m) returns a random integer between n (incl) and m (excl)
*/
export function randInt(
  low: number,
  high: number | undefined = undefined
): number {
  let min: number, max: number;
  if (high === undefined) {
    [min, max] = [0, low];
  } else if (high < low) {
    throw new Error("second argument has to be bigger than the first one!");
  } else {
    [min, max] = [low, high];
  }
  return Math.floor(Math.random() * (max - min) + min);
}

/* acts like numpy.arange()
    range(n) returns [0, 1, ..., n-1]
    range(n, m) returns [n, n+1, ..., m-1]
*/
export function range(
  low: number,
  high: number | undefined = undefined
): Array<number> {
  let min: number, max: number;
  if (high === undefined) {
    [min, max] = [0, low];
  } else if (high < low) {
    throw new Error("second argument has to be bigger than the first one!");
  } else {
    [min, max] = [low, high];
  }
  return [...Array(max - min)].map((_, idx) => min + idx);
}

console.log();

/* acts like numpy.choice()
    choice(array) returns one random item inside the array
    choice(array, n) returns an array of n random items inside the array
      if n is greater or equal to array.length, returns array

https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
*/
export function choice<T>(array: Array<T>, n: number = 1): Array<T> {
  if (n >= array.length) {
    return array;
  }
  const copy: Array<T> = [...array];
  copy.sort(() => Math.random() - 0.5);

  return copy.slice(0, n);
}

export function isString(input: any): boolean {
  return typeof input === "string" || input instanceof String;
}

export function sum(array: Array<number>): number {
  return array.reduce((p, c) => p + c);
}

export function round(num: number, precision: number = 0): number {
  return Math.round((num + Number.EPSILON) * 10 ** precision) / 10 ** precision;
}
