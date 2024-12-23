import {fizzbuzz, Mapping, max, min} from '../src/fizzbuzz';
import * as O from 'fp-ts/Option';
import {isNone, isSome} from 'fp-ts/Option';
import * as fc from 'fast-check';
import {pipe} from 'fp-ts/function';

describe('FizzBuzz should return', () => {
    test.each([
        [1, '1'],
        [67, '67'],
        [82, '82'],
        [3, 'Fizz'],
        [6, 'Fizz'],
        [18, 'Fizz'],
        [11, 'Bang'],
        [66, 'Bang'],
        [99, 'Bang'],
        [5, 'Buzz'],
        [50, 'Buzz'],
        [85, 'Buzz'],
        [15, 'FizzBuzz'],
        [30, 'FizzBuzz'],
        [45, 'FizzBuzz'],
        [7, 'Whizz'],
        [14, 'Whizz'],
        [21, 'Whizz'],
    ])('its representation %s -> %s', (input, expectedResult) => {
        const conversionResult = fizzbuzz(input);
        expect(isSome(conversionResult)).toBeTruthy();

        if (isSome(conversionResult)) {
            expect(conversionResult.value).toBe(expectedResult);
        }
    });

    const CUSTOM_MAPPING_CASES: [number, string, Mapping][] = [
        [7, 'Whizz', new Map([
            [15, 'FizzBuzz'],
            [7, 'Whizz'],
            [3, 'Fizz'],
            [5, 'Buzz'],
        ])],
        [21, 'Whizz', new Map([
            [7, 'Whizz'],
            [3, 'Fizz'],
        ])],
        [21, 'Fizz', new Map([
            [3, 'Fizz'],
            [7, 'Whizz'],
        ])],
    ];

    test.each(CUSTOM_MAPPING_CASES)("supports custom mappings in the provided order", (input, expectedResult, mapping) => {
        // when
        const conversionResult = fizzbuzz(input, mapping);

        // then
        expect(isSome(conversionResult)).toBeTruthy();

        if (isSome(conversionResult)) {
            expect(conversionResult.value).toBe(expectedResult);
        }
    })

    test('valid strings for numbers between 1 and 100', () => {
        fc.assert(
            fc.property(
                fc.integer().filter(n => n >= min && n <= max),
                (n) => isConvertValid(n)
            )
        );
    });

    const isConvertValid = (input: number): boolean => pipe(
        fizzbuzz(input),
        O.exists(result => validStringsFor(input).includes(result))
    );

    const validStringsFor = (x: number): string[] => ['Fizz', 'Buzz', 'FizzBuzz', 'Whizz', "Bang", x.toString()];

    test('none for numbers out of range', () => {
        fc.assert(
            fc.property(
                fc.integer().filter(n => n < min || n > max),
                (n) => isNone(fizzbuzz(n))
            )
        );
    });
});
