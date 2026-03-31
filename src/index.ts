'use strict';

import * as fs from 'node:fs';

let results: number[] = [];
/**
 *
 * @param filePath
 * @returns
*/
function parseCalibration(filePath: string = "./src/tests/Test.txt"): number {

    /**
     *
     * @param target
     * @param originalCalibrations
     * @param currentSum
     * @param calibrationIndex
     * @returns
     */
    function depthFirstSearch(target: number, originalCalibrations: string[], currentSum: number, calibrationIndex: number, rowIndex: number): number {
        // So check to see if currentSum is equal to target
        if (target === currentSum && !rowAdded.has(rowIndex)) {
            results.push(target);
            rowAdded.add(rowIndex);
            // console.log('adding...', target);
            return target;
        }

        if (calibrationIndex > (originalCalibrations.length)) {
            // We know that we are at the last number in the array
            return 0;
        }

        if (currentSum > target) {
            // No longer go down this path if we exceed the target value
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

        if (path1 > 0) return path1;

        return path2;

    }

    let rowAdded: Set<number> = new Set();
    let totalCalibration: number = 0;
    let planks: string = fs.readFileSync(filePath, "utf8");

    if (planks) {
        const plankArray: string[] = planks.split("\n");

        for (let i = 0; i < plankArray.length; i++) {
            let plank = plankArray[i];
            // console.log('parsing plank: ', plank)
            if (plank) {
                const plankNumbers: string[] = plank.split(" ");
                const target = plankNumbers[0]?.slice(0, plankNumbers[0].length - 1);
                const startingNumber = plankNumbers[1]

                if (target && startingNumber) {
                    const targetNum: number = Number.parseInt(target);

                    // We should potentially have an array here with the numbers in the calibration that we can use
                    // We need an index pointer and potentially a current value
                    totalCalibration += depthFirstSearch(targetNum, plankNumbers.slice(2), parseInt(startingNumber), 0, i);
                }
            }

        }
    }

    // console.log(results);
    // console.log(totalCalibration);
    return totalCalibration;
}

export { parseCalibration };