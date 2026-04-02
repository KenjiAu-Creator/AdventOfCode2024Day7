# Advent of Code 2024 - Day 7: Bridge Repair
# Part 1
## Problem Constraints
A plank on the rope bridge requires calibration. A plank is calibrated correctly if:
- The test value that appears before the colon on each line can be achieved with the remaining numbers.
- Operators are always evaluated from left-to-right
- Only two operators are allowed: add ( + ) and multiply ( * )

## Design Decisions
- Initial thoughts are that since we have two operators at every step ( + or * ) this leads backtracking type of solution and we are looking at every permutation so a DFS or BFS approach may be optimal.
- Using a testing library like jest will help speed up testing different scenarios quickly.
- Initially used a backtracking + DFS helper function for part 1 but removed the function to improve code readability.

# Part 2
A third type of operator is added: the concatenation ( || ).
For example:
- 156: 15 6 can be made true through 15 || 6 = 156

## Design Decisions
- Implemented two helper functions:
    - generatePermutations()
    - evaluateCalibration()
- I think the backtracking approach used in Part 1 could still work but found that brute force was simplier and still works within the constraints provided by the input file.
- Backtracking solution had difficulty exploring || operator for numbers past but I think it could still work.

## Complexity
### Part 1
- Time complexity: **O(n x (2 ^ m))** where n is the number of planks (equations) and m is the number of operations in the equation.

### Part 2
- Time complexity: **O(n x (3 ^ m))** where n is the number of planks (equations) and m is the number of operations in the equation.

## Lessons learned
- Breaking down the solution into reusable functions improves readability
- Ensure that variable type checking is done before comparisons
- Testing files should be small to ensure quick processing
- Should check for brute force approach before complicating solution

## Problem Link
The core problem and information can be found at: https://adventofcode.com/2024/day/7

## Installation
To run this repo simply clone it down to your machine.

Then run:
`npm install`

Next to initiate the testing run:
`npm test`