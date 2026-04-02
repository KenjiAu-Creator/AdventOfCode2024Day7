import { describe, expect, test } from '@jest/globals';
import { parseCalibration } from '../index.ts';

describe('Part 2 with concatentation operator', () => {
    test('Base example provided', () => {
        /**
         * 190: 10 19
         * 3267: 81 40 27
         * 83: 17 5
         * 156: 15 6
         * 7290: 6 8 6 15
         * 161011: 16 10 13
         * 192: 17 8 14
         * 21037: 9 7 18 13
         * 292: 11 6 16 20
         */
        expect(parseCalibration("./src/tests/Test.txt", true)).toBe(11387);
    });

    test('Triple equation works', () => {
        /**
         * 10: 5 5 (WORK)
         * 15: 3 5 (WORK)
         * 20: 4 5 (WORK)
         */
        expect(parseCalibration("./src/tests/Test1.txt", true)).toBe(45);
    });

    test('Only one equation works', () => {
        /**
         * 12: 2 3 2 (WORK)
         * 14: 2 3 4
         */
        expect(parseCalibration("./src/tests/Test2.txt", true)).toBe(12);
    });

    test('Concatenation works for all', () => {
        /**
         * 123: 12 3 (WORKS)
         * 156: 15 6 (WORKS)
         * 729: 7 2 9 (WORKS)
         */
        expect(parseCalibration("./src/tests/Test3.txt", true)).toBe(1008);
    });

    test('Two equations work for multiply and add', () => {
        /**
         * 190: 10 19       (WORK)
         * 3267: 81 40 27   (WORK)
         * 83: 17 5
         */
        expect(parseCalibration("./src/tests/Test4.txt", true)).toBe(3457);
    });

    test('Add, Multiply and Concatenation work', () => {
        /**
         * 100: 2 5 10
         * 250: 2 5 10
         */
        expect(parseCalibration("./src/tests/Test5.txt", true)).toBe(350);
    });

    test('Impossible equation', () => {
        /**
         * 50: 10 10 10
         */
        expect(parseCalibration("./src/tests/Test6.txt", true)).toBe(0);
    });

    test('Concatenation + Multiply case', () => {
        /**
         * 1212: 12 12
         * 144: 12 12
         */
        expect(parseCalibration("./src/tests/Test7.txt", true)).toBe(1356);
    });

    test('Concatenation case', () => {
        /**
         * 302: 3 0 2
         */
        expect(parseCalibration("./src/tests/Test8.txt", true)).toBe(302);
    });

    test('156: 15 6', () => {
        expect(parseCalibration("./src/tests/Test9.txt", true)).toBe(156);
    });

    test('7290: 6 8 6 15', () => {
        expect(parseCalibration("./src/tests/Test10.txt", true)).toBe(7290);
    });

    test('192: 17 8 14', () => {
        expect(parseCalibration("./src/tests/Test11.txt", true)).toBe(192);
    });

    test('10010: 0 10 0 10 0', () => {
        expect(parseCalibration("./src/tests/Test12.txt", true)).toBe(10010);
    });

    test('Triple case with concat, add and multiply', () => {
        /**
         * 156: 15 6
         * 46: 12 3 4
         * 154: 12 3 4
         */
        expect(parseCalibration("./src/tests/Test13.txt", true)).toBe(310);
    });

    test('Dual Concatenation case', () => {
        /**
         * 1234: 12 34
         * 1012: 10 12
         */
        expect(parseCalibration("./src/tests/Test14.txt", true)).toBe(2246);
    });

    test('Concatenation case with a fail', () => {
        /**
         * 30: 3 0
         * 0: 3 0
         * 302: 3 0 2
         */
        expect(parseCalibration("./src/tests/Test15.txt", true)).toBe(332);
    });

    test('46: 12 3 4', () => {
        expect(parseCalibration("./src/tests/Test16.txt", true)).toBe(0);
    });

    test('154: 12 3 4', () => {
        expect(parseCalibration("./src/tests/Test18.txt", true)).toBe(154);
    });

    test('Combined test case', () => {
        /**
         * 10: 5 5
         * 15: 3 5
         * 12: 2 3 2
         * 123: 12 3
         * 190: 10 19
         * 100: 2 5 10
         * 1212: 12 12
         * 302: 3 0 2
         */
        expect(parseCalibration("./src/tests/Test19.txt", true)).toBe(1964);
    });

    test('Part Two Input', () => {
        expect(parseCalibration("./src/tests/Input.txt", true)).toBe(581941094529163);
    });
});