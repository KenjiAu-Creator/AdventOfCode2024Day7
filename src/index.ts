'use strict';

import * as fs from 'node:fs';

/**
 * This function will return total calibration result.
 * This means it will return the summation of all rows if the LHS can equal the RHS by
 * inserting a '+' or a '*' operator between the numbers.
 *
 * Since we want to explore ALL options this points to using a DFS or a BFS approach.
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
     * @param {string} nums                 The numbers in the array with the reference to the current plank
     * @param {number} currentSum           The current sum value so far up to the calibrationIndex in nums array
     * @param {number} index                The index indicating which plank is being calibrated. (Row in the txt file)
     * @param {boolean} concat              Flag for whether to include the concatenation operator
     * @returns {number}
     */
    function addOrMultiplyDfs(target: number, nums: string[], currentSum: number, index: number, plankIndex: number, concat: boolean = false): number {
        if (target === currentSum && !rowAdded.has(plankIndex)) {
            rowAdded.add(plankIndex);
            return target;
        }
        if (rowAdded.has(plankIndex)) {
            // Skip this path if we already included the value
            return 0;
        }
        if (index >= (nums.length)) {
            // We know that we are at the last number in the array
            return 0;
        }
        if (currentSum > target) {
            // No longer go down this path if we exceed the target value
            return 0;
        }

        // if we are below the target then we should either add or multiply
        const nextString: string | undefined = nums[index];

        if (nextString) {
            let nValue = Number.parseInt(nextString);

            // + path
            let newSum = currentSum + nValue;
            const path1 = addOrMultiplyDfs(target, nums, newSum, index + 1, plankIndex, concat);
            if (path1) return path1;

            // * path
            let newMult = currentSum * nValue;
            const path2 = addOrMultiplyDfs(target, nums, newMult, index + 1, plankIndex, concat);
            if (path2) return path2;
        }

        return 0;
    }

    function generatePermutations(target: number, nums: string[]): string[][] {
        const ops = ["+", "*", "||"];
        let resultSet: string[][] = [];

        function dfs(index: number, set: string[]) {
            const cVal = nums[index];
            if (cVal) {
                if (index >= nums.length - 1) {
                    const cSet = [...set, cVal];
                    resultSet.push(cSet);
                    return;
                }
            }

            if (index < nums.length) {
                const cVal = nums[index];
                if (cVal) {
                    set.push(cVal);

                    for (const op of ops) {
                        dfs(index + 1, [...set, op]);
                    }
                }
            }
        }

        dfs(0, [])

        return resultSet;
    }

    function evaluateCalibration(target: number, equation: string[]): boolean {
        let opStack: string[] = [];
        let numStack: number[] = [];
        let cEq = [...equation];
        // reverse the array for easy of manipulation first
        while (equation.length) {
            let tail: string | undefined = equation.pop();

            if (tail && Number.parseInt(tail) || tail === "0") {
                numStack.push(Number.parseInt(tail));
            } else if (typeof tail === "string") {
                opStack.push(tail);
            }
        }
        // console.log('nStack:', numStack)
        const firstNum: number | undefined = numStack.pop();
        let sum: number = firstNum ? firstNum : 0;

        while (opStack.length) {
            let op = opStack.pop();

            let nextVal: number | undefined = numStack.pop();

            // console.log(nextVal);
            if (typeof nextVal === "number") {
                // console.log('n', nextVal);
                if (op === "+") {
                    sum += nextVal;
                } else if (op === "*") {
                    sum *= nextVal;
                } else if (op === "||") {
                    sum = Number.parseInt(`${sum}${nextVal}`);
                }
            } else {
                break;
            }
        }

        // console.log(`${cEq}:${sum}`);
        return sum === target ? true : false;
    }

    let rowAdded: Set<number> = new Set();
    let totalCalibration: number = 0;
    const planks: string = fs.readFileSync(filePath, "utf8");

    if (planks) {
        const plankArray: string[] = planks.split("\n");

        for (let i = 0; i < plankArray.length; i++) {
            const plank = plankArray[i]; // Each plank is a row that we need to calibrate - so isolate the row first
            if (plank?.length) {
                const plankNumbers: string[] = plank.split(" ");
                const target = plankNumbers[0]?.slice(0, plankNumbers[0].length - 1);   // First element is target

                if (target) {
                    const targetNum: number = Number.parseInt(target);

                    if (concat) {
                        // totalCalibration += concatDfs(
                        //     targetNum,                  // Target
                        //     plankNumbers,
                        //     0,                          // Initial sum
                        //     1,                          // The next element in the array we considering
                        //     i,                          // plank index or row index
                        // );

                        const perms = generatePermutations(targetNum, plankNumbers.slice(1));
                        for (const perm of perms) {
                            if (evaluateCalibration(targetNum, perm)) {
                                totalCalibration += targetNum;
                                // Stop the loop if we have an equation that works
                                break;
                            }
                        }
                    } else {
                        totalCalibration += addOrMultiplyDfs(
                            targetNum,                  // Target
                            plankNumbers,
                            0,                          // Initial sum
                            1,                          // The next element in the array we considering
                            i,                          // plank index or row index
                            concat,                     // Concat flag
                        );
                    }
                }
            }

        }
    }

    return totalCalibration;
}

export { parseCalibration };