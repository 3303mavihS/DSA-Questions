# Frog Jump (GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/geek-jump/1)

## Problem Statement
Given an integer array height[] where height[i] represents the height of the i-th stair, a frog starts from the first stair and wants to reach the last stair.
From any stair i, the frog has two options: it can either jump to the (i+1)th stair or the (i+2)th stair. The cost of a jump is the absolute difference in height between the two stairs.
Determine the minimum total cost required for the frog to reach the last stair.
Example:
```
Input: heights[] = [20, 30, 40, 20]
Output: 20
Explanation: Minimum cost is incurred when the frog jumps from stair 0 to 1 then 1 to 3:
jump from stair 0 to 1: cost = |30 - 20| = 10
jump from stair 1 to 3: cost = |20 - 30| = 10
Total Cost = 10 + 10 = 20
```
```
Input: heights[] = [30, 20, 50, 10, 40]
Output: 30
Explanation: Minimum cost will be incurred when frog jumps from stair 0 to 2 then 2 to 4:
jump from stair 0 to 2: cost = |50 - 30| = 20
jump from stair 2 to 4: cost = |40 - 50| = 10
Total Cost = 20 + 10 = 30
```
Constraints:
1 ≤ height.size() ≤ 10^5
0 ≤ height[i] ≤ 10^4

## Understanding 💡
Its same as climbing stairs problem. but here we need to get the min energy spent to reach top. instead of counting the no. of way, we have to find a way which allows us to use minimum value of total energy.

## Approach 🚀
first we figure out a way to do in recursive way and then we solve the overlapping problem by using memoization. and then use the tabular way to remove the space complexity as well

## Code 🖥️

### Python
```python
class Solution:
    def minCost(self, height: list[int]) -> int:
        """
        recurrence way can solve this but it may
        get into time limit exceed issue. because of
        it overlapping calculation nature. so using
        memoization method in dp. we can keep record
        of sub problem and not recalcuate the values
        """
        # n = len(height)
        
        # dp_arr = {}
        
        # def calc_min(i, height, dp_arr):
            
        #     if i == 0:
        #         return 0
            
        #     if i in dp_arr:
        #         return dp_arr[n]
            
        #     left = calc_min(i-1, height, dp_arr) + abs(height[i] - height[i-1])
            
        #     right = float('inf')
        #     if n > 1:
        #         right = calc_min(i-2, height, dp_arr) + abs(height[i] - height[i-2])
            
        #     dp_arr[i] = min(left, right)
            
        #     return dp_arr[i]

        
        # return calc_min(n-1, height, dp_arr)
        
        
        """
        since required space complexity is O(1)
        that means we can have use tabular method of 
        dp and solve it in required space complexity
        """
        
        n = len(height)
        
        dp_arr = {}

        dp_arr[0] = 0

        for i in range(1, n):
            fs = dp_arr[i-1] + abs(height[i] - height[i-1])

            ss = float('inf')
            if i > 1:
                ss = dp_arr[i-2] + abs(height[i] - height[i-2])

            dp_arr[i] = min(fs, ss)

        return dp_arr[n-1]
```

## Complexity Analysis ⏳
- Time Complexity : O(n)
- Space Complexity : O(1)

