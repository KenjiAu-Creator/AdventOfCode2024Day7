import { describe, expect, test } from '@jest/globals';
import { parseCalibration } from '../index.ts';

describe('Part 1 Calibration testing', () => {
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
        expect(parseCalibration("./src/tests/Test.txt", false)).toBe(3749);
    });

    test('Triple equation works', () => {
        /**
         * 10: 5 5 (WORK)
         * 15: 3 5 (WORK)
         * 20: 4 5 (WORK)
         */
        expect(parseCalibration("./src/tests/Test1.txt", false)).toBe(45);
    });

    test('Only one equation', () => {
        /**
         * 12: 2 3 2 (WORK)
         * 14: 2 3 4
         */
        expect(parseCalibration("./src/tests/Test2.txt", false)).toBe(12);
    });

    test('No equations work', () => {
        /**
         * 123: 12 3
         * 156: 15 6
         * 729: 7 2 9
         */
        expect(parseCalibration("./src/tests/Test3.txt", false)).toBe(0);
    });

    test('Two equations', () => {
        /**
         * 190: 10 19       (WORK)
         * 3267: 81 40 27   (WORK)
         * 83: 17 5
         */
        expect(parseCalibration("./src/tests/Test4.txt", false)).toBe(3457);
    });

    test('Two operations & one equation works', () => {
        /**
         * 100: 2 5 10
         * 250: 2 5 10
         */
        expect(parseCalibration("./src/tests/Test5.txt", false)).toBe(100);
    });

    test('Impossible equation', () => {
        /**
         * 50: 10 10 10
         */
        expect(parseCalibration("./src/tests/Test6.txt", false)).toBe(0);
    });

    test('One equation multiply', () => {
        /**
         * 1212: 12 12
         * 144: 12 12
         */
        expect(parseCalibration("./src/tests/Test7.txt", false)).toBe(144);
    });

    test('302: 3 0 2', () => {
        /**
         * 302: 3 0 2
         */
        expect(parseCalibration("./src/tests/Test8.txt", false)).toBe(0);
    });

    test('Combined test cases', () => {
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
        expect(parseCalibration("./src/tests/Test19.txt", false)).toBe(327);
    });

    test('Part One Input', () => {
        expect(parseCalibration("./src/tests/Input.txt", false)).toBe(21572148763543);
    });
});