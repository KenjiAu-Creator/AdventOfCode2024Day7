'use strict';

import * as fs from 'node:fs';

let results = [];
let rowAdded: Set<number> = new Set();
/**
 *
 * @param filePath
 * @returns
 */
function parseCalibration(filePath: string = "./src/tests/adventDay7Test.txt"): number {
    let totalCalibration: number = 0;
    let planks: string = fs.readFileSync(filePath, "utf8");

    if (planks) {
        const plankArray: string[] = planks.split("\n");

        for (let i = 0; i < plankArray.length; i++) {
            let plank = plankArray[i];
            if (plank) {
                const plankNumbers: string[] = plank.split(" ");
                // console.log(plankNumbers);
                const target = plankNumbers[0]?.slice(0, plankNumbers[0].length - 1);
                const startingNumber = plankNumbers[1]

                if (target && startingNumber) {
                    const targetNum: number = Number.parseInt(target);
                    // console.log('target', targetNum);

                    totalCalibration += depthFirstSearch(targetNum, plankNumbers.slice(2), parseInt(startingNumber), 0, i);
                }
            }

            // We should potentially have an array here with the numbers in the calibration that we can use
            // We need an index pointer and potentially a current value
        }
    }

    // console.log(totalCalibration);
    return totalCalibration;
}

/**
 *
 * @param target
 * @param originalCalibrations
 * @param currentSum
 * @param calibrationIndex
 * @returns
 */
function depthFirstSearch(target: number, originalCalibrations: string[], currentSum: number, calibrationIndex: number, rowIndex: number): number {
    // console.log('currentSum:', currentSum);
    // console.log('ci', calibrationIndex);
    // console.log(originalCalibrations);
    // console.log(target);
    // console.log(originalCalibrations);
    // So check to see if currentSum is equal to target
    if (target === currentSum && !rowAdded.has(rowIndex)) {
        results.push(target);
        rowAdded.add(rowIndex);
        // console.log('adding...', target);
        return target;
    }

    if (calibrationIndex >= (originalCalibrations.length)) {
        // We know that we are at the last number in the array
        return 0;
    }

    // if not then we should either add or multiply
    const nextValue: string | undefined = originalCalibrations[calibrationIndex];
    let nValue: number = 0;
    if (nextValue) {
        nValue = parseInt(nextValue);
    }

    // Path 1 where we add the next number
    const path1 = depthFirstSearch(target, originalCalibrations, currentSum + nValue, calibrationIndex + 1, rowIndex);

    // Path 2 where we multiply the next number
    const path2 = depthFirstSearch(target, originalCalibrations, currentSum * nValue, calibrationIndex + 1, rowIndex);

    if (path1) return path1;

    return path2;

}

// parseCalibration();

export { parseCalibration, depthFirstSearch };