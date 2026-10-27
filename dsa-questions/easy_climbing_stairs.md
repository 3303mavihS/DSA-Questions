# Climbing Stairs (Leetcode, TUF) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/climbing-stairs/description/)

## Problem Statement
You are climbing a staircase. It takes `n` steps to reach the top.
Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?
Example 1:
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```
Example 2:
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```
Constraints:
- `1 <= n <= 45`

## Understanding 💡
We need to count that there are how many ways to climb a stair with n steps where we can only take 1 step or 2 step at a time. so how many ways to reach the top.

## Approach 🚀
Basically we have to calculate all the possible ways of reaching tops with different combinations of taking 1 and 2 step. ans we can do it in a recursive way. and while doing the calculation way, we will encounter overlapping calculation that will cause the TLE. so by using memoization technique. we can solve that problem. and we can calculate all the possible way.

## Code 🖥️

### Python
```python
class Solution:
    def climbStairs(self, n: int) -> int:

        """
        recursive way
        """
        # if n == 0:
        #     return 1

        # if n == 1:
        #     return 1

        # left = self.climbStairs(n-1)
        # right = self.climbStairs(n-2)

        # return left + right


        """
        DP way

        memoization
        """
        dp_arr = {}

        def calculate_ways(n, dp_arr):

            if n <= 1:
                return 1

            if n in dp_arr:
                return dp_arr[n]

            dp_arr[n] = calculate_ways(n-1, dp_arr) + calculate_ways(n-2, dp_arr)

            return dp_arr[n]

        return calculate_ways(n, dp_arr)

```

## Complexity Analysis ⏳
- Time Complexity : O(n)
- Space Complexity : O(n)
