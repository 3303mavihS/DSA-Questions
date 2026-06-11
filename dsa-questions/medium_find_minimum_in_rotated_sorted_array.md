# Find Minimum in Rotated Sorted Array (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)

## Problem Statement
Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:
- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.
Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.
Given the sorted rotated array `nums` of unique elements, return *the minimum element of this array*.
You must write an algorithm that runs in `O(log n) time`.
Example 1:
```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```
Example 2:
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```
Example 3:
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```
Constraints:
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are unique.
- `nums` is sorted and rotated between `1` and `n` times.


## Approach 🚀
In a rotated sorted array, the smallest element represents the point of rotation. It is the only element that is smaller than its previous element. Since the array is sorted in two segments, we can use binary search to efficiently find this pivot point. By comparing the middle element with the rightmost element in the current search space, we can determine which half of the array contains the minimum element.
- Initialize pointers to the start and end of the array.
- While start is less than end, calculate the middle index.
- If the middle element is greater than the rightmost element, move the start to mid + 1.
- Else, move the end to mid (because mid can be the minimum).
- When the loop ends, start will point to the minimum element.

## Code 🖥️

### Python
```python
class Solution:
    def findMin(self, nums: List[int]) -> int:

        if len(nums) == 1:
            return nums[0]

        """
        brute for will take O(n) time.
        but in order to get the min value we can go 
        shrink the search area to only two indexes
        """
        low = 0
        high = len(nums) - 1

        while low <= high:
            # check first if the search area is consecutive
            if high-low == 1:
                return min(nums[low], nums[high])
            # if not then
            else:
                # check if the array is already sorted
                # if yes then return the low index value 
                if nums[low] < nums[high]:
                    return nums[low]
                # else shrink the search area
                else:
                    mid = low + (high-low)//2
                    # unsorted means the rotated part exist there only
                    # if left side is unsorted
                    if nums[low] > nums[mid]:
                        high = mid
                    # if right side is unsorted
                    elif nums[mid] > nums[high]:
                        low = mid
                    # this means the array is sort (probably never reach here)
                    else:
                        continue


 
```

## Complexity Analysis ⏳
Time Complexity: O(logN), at every step the search space is reduced to half using binary search.
Space Complexity: O(1), constant additonal space is used.

