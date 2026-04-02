import { describe, expect, test } from '@jest/globals';
import { parseCalibration } from '../index.ts';

describe('Part 2 with concatentation operator', () => {
    test('Test example', () => {
        expect(parseCalibration("./src/tests/Test.txt", true)).toBe(11387);
    });

    test('Test1 example', () => {
        expect(parseCalibration("./src/tests/Test1.txt", true)).toBe(45);
    });

    test('Test2 example', () => {
        expect(parseCalibration("./src/tests/Test2.txt", true)).toBe(12);
    });

    test('Test3 example', () => {
        expect(parseCalibration("./src/tests/Test3.txt", true)).toBe(1008);
    });

    test('Test4 example', () => {
        expect(parseCalibration("./src/tests/Test4.txt", true)).toBe(3457);
    });

    test('Test5 example', () => {
        expect(parseCalibration("./src/tests/Test5.txt", true)).toBe(350);
    });

    test('Test6 example', () => {
        expect(parseCalibration("./src/tests/Test6.txt", true)).toBe(0);
    });

    test('Test7 example', () => {
        expect(parseCalibration("./src/tests/Test7.txt", true)).toBe(1356);
    });

    test('Test8 example', () => {
        expect(parseCalibration("./src/tests/Test8.txt", true)).toBe(302);
    });

    test('Test9 example', () => {
        expect(parseCalibration("./src/tests/Test9.txt", true)).toBe(156);
    });

    test('Test10 example', () => {
        expect(parseCalibration("./src/tests/Test10.txt", true)).toBe(7290);
    });

    test('Test11 example', () => {
        expect(parseCalibration("./src/tests/Test11.txt", true)).toBe(192);
    });

    test('Test12 example', () => {
        expect(parseCalibration("./src/tests/Test12.txt", true)).toBe(10010);
    });

    test('Test13 example', () => {
        expect(parseCalibration("./src/tests/Test13.txt", true)).toBe(310);
    });

    test('Test14 example', () => {
        expect(parseCalibration("./src/tests/Test14.txt", true)).toBe(2246);
    });

    test('Test15 example', () => {
        expect(parseCalibration("./src/tests/Test15.txt", true)).toBe(332);
    });

    test('Test16 example', () => {
        expect(parseCalibration("./src/tests/Test16.txt", true)).toBe(0);
    });

    test('Test17 example', () => {
        expect(parseCalibration("./src/tests/Test17.txt", true)).toBe(7290);
    });

    test('Test18 example', () => {
        expect(parseCalibration("./src/tests/Test18.txt", true)).toBe(154);
    });

    test('Test19 example', () => {
        expect(parseCalibration("./src/tests/Test19.txt", true)).toBe(1964);
    });

    test('Part Two Input', () => {
        expect(parseCalibration("./src/tests/Input.txt", true)).toBe(581941094529163);
    });
});