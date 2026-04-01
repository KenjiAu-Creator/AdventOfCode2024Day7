'use strict';

import * as fs from 'node:fs';

/**
 * This function will return total calibration result.
 * This means it will return the summation of all rows if the LHS can equal the RHS by
 * inserting a '+' or a '*' operator between the numbers.
 *
 * @param filePath the file path to the data to be parsed to figure out the calibration data
 *
 * @returns {number} the result of adding the first number in every row that meets the calibration equation requirement
*/
function parseCalibration(filePath: string, concat: boolean = false): number {
    /**
     * This function will use a DFS approach to recursively check every permutation of '+' or '*' between elements
     * inside the equation. This function will return the target number if the equation is possible and will return 0 otherwise.
     *
     * @param {number} target               The first number in the equation that must be equal to the summation
     * @param {string} originalCalibrations Original calibration numbers the reference the plank
     * @param {number} currentSum           The current sum value so far up to the calibrationIndex in originalCalibrations array
     * @param {number} calibrationIndex     The index indicating which number in the originalCalibrations array we are adding
     * @param {boolean} concat              Flag for whether to include the concatenation operator
     * @returns {number}
     */
    function depthFirstSearch(target: number, originalCalibrations: string[], currentSum: number, calibrationIndex: number, rowIndex: number, concat: boolean = false): number {
        // So check to see if currentSum is equal to target
        if (rowAdded.has(rowIndex)) {
            // Skip this path if we already included the value
            return 0;
        } else if (calibrationIndex > (originalCalibrations.length)) {
            // We know that we are at the last number in the array
            return 0;
        } else if (currentSum > target) {
            // No longer go down this path if we exceed the target value
            return 0;
        }

        if (currentSum >= Number.MAX_SAFE_INTEGER || currentSum >= Number.MAX_VALUE) {
            console.log('s')
        }

        if (target === currentSum) {
            rowAdded.add(rowIndex);
            return target;
        }

        // if we are below the target then we should either add or multiply
        const nextValue: string | undefined = originalCalibrations[calibrationIndex];
        let nValue: number = 0;

        if (nextValue) {
            nValue = parseInt(nextValue);
        }

        // Path 1 where we add the next number
        const path1 = depthFirstSearch(target, originalCalibrations, currentSum + nValue, calibrationIndex + 1, rowIndex, concat);

        // Path 2 where we multiply the next number
        const path2 = depthFirstSearch(target, originalCalibrations, currentSum * nValue, calibrationIndex + 1, rowIndex, concat);

        // Path 3 Where we concatenate with the next number
        let path3 = 0;

        if (concat) {
            const concatenation = Number.parseInt(`${currentSum}${nValue}`);
            path3 = depthFirstSearch(target, originalCalibrations, concatenation, calibrationIndex + 1, rowIndex, true);
        }

        if (path3 > 0) return path3;
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
            if (plank?.length) {
                const plankNumbers: string[] = plank.split(" ");
                const target = plankNumbers[0]?.slice(0, plankNumbers[0].length - 1);
                const startingNumber = plankNumbers[1]

                if (target && startingNumber) {
                    const targetNum: number = Number.parseInt(target);

                    totalCalibration += depthFirstSearch(
                        targetNum,                  // Target
                        plankNumbers.slice(2),      // Array to iterate through
                        parseInt(startingNumber),   // First element in array
                        0,                          // Starting position in slice array
                        i,                          // Row we are in
                        concat                      // Concat flag
                    );
                }
            }

        }
    }

    return totalCalibration;
}

export { parseCalibration };