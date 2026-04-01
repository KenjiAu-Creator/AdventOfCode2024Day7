import { describe, expect, test } from '@jest/globals';
import { parseCalibration } from '../index.ts';

describe('Calculate calibration example', () => {
    test('Test example', () => {
        expect(parseCalibration("./src/tests/Test.txt", false)).toBe(3749);
    });

    test('Test1 example', () => {
        expect(parseCalibration("./src/tests/Test1.txt", false)).toBe(45);
    });

    test('Test2 example', () => {
        expect(parseCalibration("./src/tests/Test2.txt", false)).toBe(12);
    });

    test('Test3 example', () => {
        expect(parseCalibration("./src/tests/Test3.txt", false)).toBe(0);
    });

    test('Test4 example', () => {
        expect(parseCalibration("./src/tests/Test4.txt", false)).toBe(3457);
    });

    test('Test5 example', () => {
        expect(parseCalibration("./src/tests/Test5.txt", false)).toBe(100);
    });

    test('Test6 example', () => {
        expect(parseCalibration("./src/tests/Test6.txt", false)).toBe(0);
    });

    test('Test7 example', () => {
        expect(parseCalibration("./src/tests/Test7.txt", false)).toBe(144);
    });

    test('Test8 example', () => {
        expect(parseCalibration("./src/tests/Test8.txt", false)).toBe(0);
    });

    test('TestBlock example', () => {
        expect(parseCalibration("./src/tests/TestBlock.txt", false)).toBe(327);
    });

    test('Part One Input', () => {
        expect(parseCalibration("./src/tests/Input.txt", false)).toBe(21572148763543);
    });
});