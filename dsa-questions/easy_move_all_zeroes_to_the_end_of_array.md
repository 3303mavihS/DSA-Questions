# Move all zeroes to the end of array (Takeuforward, Leedcode) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/move-zeroes/)

## Problem Statement
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.
Example 1:
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```
Example 2:
```
Input: nums = [0]
Output: [0]
```

## Understanding 💡
Need to move all the zeroes existing in an array or list to the end of the array.

## Approach 🚀
**Brute Force :**
Create a extra array or list with same size as original and first move all the non-zeroes in the starting (if we default keep all the values as zeroes and we may not need to completely fill the array. it will work. T(n) = O(n), S(n) = O(n)

**Better Optimized :**
we can use two pointer approach. move the both pointer by one step if first pointer is non zero. if second pointer meets zero, ignore but if it meets non-zero number, swap the values of ith and jth index. T(n) = O(n), S(n) = O(1)

## Code 🖥️

### Python
```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)

        i = 0
        j = 0

        if n == 1:
            return nums

        while i<n and j<n:
            if nums[i] != 0:
                i+=1
                j+=1
                continue
            
            if nums[j] == 0:
                j+=1
                continue
            
            if nums[j] != 0:
                nums[i] = nums[j]
                nums[j] = 0
                i+=1
                j+=1
    
        return nums
```

## Complexity Analysis ⏳
**Brute Force :** T(n) = O(n), S(n) = O(n)

**Better Optimized :**
T(n) = O(n), S(n) = O(1)

## Edge Cases 🔍
- having only one element.
