# Find First and Last Position of Element in Sorted Array (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/)

## Problem Statement
Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.
If `target` is not found in the array, return `[-1, -1]`.
You must write an algorithm with `O(log n)` runtime complexity.
Example 1:
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```
Example 2:
```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```
Example 3:
```
Input: nums = [], target = 0
Output: [-1,-1]
```
Constraints:
```
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non-decreasing array.
- `-10^9 <= target <= 10^9`
```

## Understanding 💡
return an array of index for the first occurrence and last occurrence of a given target value in a sorted array with duplicated elements.

## Approach 🚀
- Given that the array is sorted, we can use binary search to efficiently search for the target element.
- Initially, set two pointers: start = 0 and end = n-1, where n is the size of the array. Also, initialize the result variable to -1.
- While start is less than or equal to end, compute the mid index as mid = (start + end) / 2.
- Check if the mid element is equal to the target key:  
    - If they are equal, store the mid value in the result and move the start pointer to mid + 1 to continue searching in the right half.
- If the key value is less than the mid element, update the end pointer to mid - 1 to search the left half.
- If the key value is greater than the mid element, update the start pointer to mid + 1 to search the right half.
- Repeat the process until the start pointer crosses the end pointer or the element is found.
- If the element is found, the result will store its index, otherwise, it will remain -1 indicating that the target is not present in the array.

## Code 🖥️

### Python
```python
class Solution:

    def findFirst(self, nums: List[int], n: int, target: int) -> List[int]:

        low = 0
        high = n-1

        ans = -1

        while low <= high:

            mid = low + (high - low)//2

            if nums[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        if ans != -1 and nums[ans] != target:
            ans = -1

        return ans


    def findLast(self, nums: List[int], n: int, target: int) -> List[int]:

        low = 0
        high = n-1

        ans = -1

        while low <= high:

            mid = low + (high - low)//2

            if nums[mid] <= target:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        if ans != -1 and nums[ans] != target:
            ans = -1

        return ans


    def searchRange(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)

        first = self.findFirst(nums, n, target)
        last = self.findLast(nums, n, target)

        return [first, last]
        
```

## Complexity Analysis ⏳
- Time Complexity: O(log N), where N is the size of the array. This is because we are using binary search, which reduces the search space by half in each iteration.
- Space Complexity: O(1), as we are using a constant amount of space for the result variable and the loop indices. We are not using any additional data structures that grow with the input size.

## Edge Cases 🔍
