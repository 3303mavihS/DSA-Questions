# House Robber II (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/house-robber-ii/description/)

## Problem Statement
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.
Example 1:
```
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```
Example 2:
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```
Example 3:
```
Input: nums = [1,2,3]
Output: 3
```
Constraints:
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Understanding 💡
Here this question is just an extension of the previous house robber question with an extra contraint where the whole array/house is maintained in circular way that means the first and last element will be considered as adjacent element.

## Approach 🚀
we can just use the same approach of house robber. but we can use a small trick here where we make two temporary array out of the original array. one with adding first element and excluding last element and other where exclude first and include last element. and get separate answer for both and get the max out of it.

## Code 🖥️

### Python
```python
class Solution:
    def normal_rob(self, arr: list[int]) -> int:
        n = len(arr)
        
        prev = arr[0]
        prev_prev = 0
        
        for i in range(1, n):
            take = arr[i]
            
            if i>1:
                take += prev_prev
            
            not_take = 0 + prev
            
            cur_i = max(take, not_take)
            prev_prev = prev
            prev = cur_i
            
        return prev

    def rob(self, nums: list[int]) -> int:

        """
        this is question is extended version for 
        house robber question, extra constraint here is
        the house are arranged in circular manner
        that means, the first and last element cannot be 
        part of the solution at the same time. it's the case
        of either first or last element.
        """

        """
        so for this we can just have calculate the answer for
        first case : include first, exclude last
        second case : exclude first, include last
        separately and get the max out of it and return the sol
        """
        n = len(nums)

        if n == 1:
            return nums[0]

        temp_arr_1 = nums[0:n-1]
        temp_arr_2 = nums[1:n]

        ans = max(self.normal_rob(temp_arr_1), self.normal_rob(temp_arr_2))

        return ans

```

## Complexity Analysis ⏳
- Time Complexity : O(2n)
- Space Complexity : O(1)

