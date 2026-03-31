import { describe, expect, test } from '@jest/globals';
import { parseCalibration } from '../index.ts';

describe('Calculate calibration example', () => {
    test('Test example', () => {
        expect(parseCalibration()).toBe(3749);
    });

    test('Test1 example', () => {
        expect(parseCalibration("./src/tests/Test1.txt")).toBe(45);
    });

    test('Test2 example', () => {
        expect(parseCalibration("./src/tests/Test2.txt")).toBe(12);
    });

    test('Test3 example', () => {
        expect(parseCalibration("./src/tests/Test3.txt")).toBe(0);
    });

    test('Test4 example', () => {
        expect(parseCalibration("./src/tests/Test4.txt")).toBe(3457);
    });

    test('Test5 example', () => {
        expect(parseCalibration("./src/tests/Test5.txt")).toBe(100);
    });

    test('Test6 example', () => {
        expect(parseCalibration("./src/tests/Test6.txt")).toBe(0);
    });

    test('Test7 example', () => {
        expect(parseCalibration("./src/tests/Test7.txt")).toBe(144);
    });

    test('Test8 example', () => {
        expect(parseCalibration("./src/tests/Test8.txt")).toBe(0);
    });

    test('TestBlock example', () => {
        expect(parseCalibration("./src/tests/TestBlock.txt")).toBe(327);
    });

    // test('First Input', () => {
    //     expect(parseCalibration("./src/tests/Input.txt")).toBe(0);
    // });
});