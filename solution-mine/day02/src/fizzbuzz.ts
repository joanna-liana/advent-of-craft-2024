import {none, Option, some} from "fp-ts/Option";

export const min = 1;
export const max = 100;

export type Mapping = Map<number, string>;

let defaultMapping: Mapping = new Map([
    [15, 'FizzBuzz'],
    [11, 'Bang'],
    [7, 'Whizz'],
    [3, 'Fizz'],
    [5, 'Buzz'],
]);

export const fizzbuzz = (input: number, mapping = defaultMapping): Option<string> =>
    isOutOfRange(input)
        ? none
        : some(convertSafely(input, mapping));

function convertSafely(input: number, mapping: Mapping): string {
    for (const [divisor, value] of mapping) {
        if (is(divisor, input)) {
            return value;
        }
    }
    return input.toString();
}

const is = (divisor: number, input: number): boolean => input % divisor === 0;
const isOutOfRange = (input: number): boolean => input < min || input > max;
