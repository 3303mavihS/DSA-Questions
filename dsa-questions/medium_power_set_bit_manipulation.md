# Power Set [Bit Manipulation] (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/subsets/description/)

## Problem Statement
Given an integer array `nums` of unique elements, return *all possible* *subsets* *(the power set)*.
The solution set must not contain duplicate subsets. Return the solution in any order.
Example 1:
```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```
Example 2:
```
Input: nums = [0]
Output: [[],[0]]
```
Constraints:
- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All the numbers of `nums` are unique.

## Understanding 💡
need to calculate the power set of given array. as we know what power set is.

## Approach 🚀
Approach: Bit Manipulation
For an array of size `n`, there are `2^n` possible subsets because each element can either be included or excluded.
- Iterate from `0` to `2^n - 1`. Each number represents a subset using its binary representation.
- For each bit position `j`, use `i & (1 << j)` to check whether that bit is set.
- If the bit is set, include `nums[j]` in the current subset.
- Add each generated subset to the answer.

## Code 🖥️

### Python
```python
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        n = len(nums)
        ans = []

        for i in range(0, 2**n):
            temp = []
            for j in range(n):
                if i & (1 << j):
                    temp.append(nums[j])
            
            ans.append(temp)
        
        return ans
```

## Complexity Analysis ⏳
Time: `O(n × 2^n)`
Space: `O(1)` including the output.
Auxiliary Space: `O(1)` not including the output space
