import { describe, expect, test } from '@jest/globals';
import { parseCalibration, depthFirstSearch } from '../index.ts';

describe('Calculate calibration example', () => {
    test('First example', () => {
        expect(parseCalibration()).toBe(3749);
    });


    test('First Input', () => {
        expect(parseCalibration("./src/tests/adventDay7Input.txt")).toBe(0);
    });
});