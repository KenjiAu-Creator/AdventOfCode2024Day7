'use strict';

import * as fs from 'node:fs';

/**
 * This function will return total calibration result.
 * This means it will return the summation of all rows if the LHS can equal the RHS by
 * inserting a '+' or a '*' operator between the numbers.
 *
 * Since we want to explore ALL options this points to using a DFS or a BFS approach.
 *
 * @param {string} filePath The file path to the data to be parsed to figure out the calibration data
 * @param {boolean} concat  Flag to include concatenation operator
 *
 * @returns {number} the result of adding the first number in every row that meets the calibration equation requirement
*/
function parseCalibration(filePath: string, concat: boolean = false): number {
    /**
     * This function will take in an array of numbers and return 2D array of expressions where each permutation of
     * '+', '*', or '||' is in place between each number.
     *
     * @param {string[]} nums   Array of numbers the expression will contain
     * @param {boolean} concat    Flag to include concatenation operator
     *
     * @returns {string[][]}    Returns a 2D array of all permutations of possible expressions
     */
    function generatePermutations(nums: string[], concat: boolean): string[][] {
        const ops = ["+", "*"];

        if (concat) {
            ops.push("||")
        }

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

    /**
     * This function will evaluate an express from left to right.
     * Currently it will only evaluate '+', '*', and '||' operations
     * It will return true if the expression is equal to the target parameter supplied.
     * It will NOT take into account precedence as stated in the problem definition.
     *
     * @param {number}   target        Target value to check for at the end of the expression
     * @param {string[]} equation      An array of strings containing both the numbers and operators to evaluate
     *
     * @returns {boolean}   Returns true if the equation equals the target parameter and false otherwise
     */
    function evaluateCalibration(target: number, equation: string[]): boolean {
        let opStack: string[] = [];
        let numStack: number[] = [];

        // reverse the array for easy of manipulation first
        while (equation.length) {
            let tail: string | undefined = equation.pop();

            if (tail && Number.parseInt(tail) || tail === "0") {
                numStack.push(Number.parseInt(tail));
            } else if (typeof tail === "string") {
                opStack.push(tail);
            }
        }

        const firstNum: number | undefined = numStack.pop();
        let sum: number = firstNum ? firstNum : 0;

        while (opStack.length) {
            let op = opStack.pop();

            let nextVal: number | undefined = numStack.pop();

            if (typeof nextVal === "number") {
                if (op === "+") {
                    sum += nextVal;
                } else if (op === "*") {
                    sum *= nextVal;
                } else if (op === "||") {
                    sum = Number.parseInt(`${sum}${nextVal}`);
                }

                if (sum > target) {
                    // Prune this path if we are above the target
                    return false;
                }
            } else {
                break;
            }
        }

        return sum === target ? true : false;
    }

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

                    const perms = generatePermutations(plankNumbers.slice(1), concat);
                    for (const perm of perms) {
                        if (evaluateCalibration(targetNum, perm)) {
                            totalCalibration += targetNum;
                            // Stop the loop if we have an equation that works
                            break;
                        }
                    }
                }
            }

        }
    }

    return totalCalibration;
}

export { parseCalibration };