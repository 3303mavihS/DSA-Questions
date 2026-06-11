# Search in Rotated Sorted Array (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/search-in-rotated-sorted-array/description/)

## Problem Statement
There is an integer array `nums` sorted in ascending order (with distinct values).
Prior to being passed to your function, `nums` is possibly left rotated at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.
Given the array `nums` after the possible rotation and an integer `target`, return *the index of *`target`* if it is in *`nums`*, or *`-1`* if it is not in *`nums`.
You must write an algorithm with `O(log n)` runtime complexity.
Example 1:
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```
Example 2:
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```
Example 3:
```
Input: nums = [1], target = 0
Output: -1
```
Constraints:
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are unique.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`


## Approach 🚀

In normal binary search, we rely on the entire array being sorted to decide whether to go left or right. But in this case, we adapt it slightly we don't require the whole array to be sorted, just identify which part is sorted in the current range. Once we know which part is sorted, we check if the target lies inside that sorted section. If it does, we discard the other half. If not, we discard the sorted half and search the remaining half. No matter how the array was rotated, the sorted structure on at least one side of any middle point always helps us narrow down where to look next. This lets us avoid scanning the whole array like in brute force, and instead bring down the number of checks to logarithmic time.- Start by looking at the middle element of the array.
- Check if this middle element is the target if yes, return its index immediately.
- Now figure out which half of the array (left side or right side) is sorted.
- If the left part is sorted:  - Check if the target number falls within the range of that sorted part.
  - If it does, discard the right half and continue the search in the left part.
  - If it doesn’t, discard the left half and search in the right side.
- If the right part is sorted:  - Do the same check if the target is in that sorted part.
  - If yes, discard the left side and search in the right.
  - If not, discard the right and continue with the left.
- Repeat this process of eliminating half the array until the target is found or the search space is empty.

## Code 🖥️

### Python
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        """
        since left rotated at unknown index
        we need to check if the target exists
        but before that if the left side is sorted or not.
        if yes we go further and check if the target lies between
        the both ends.
        """
        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = low + (high - low)//2

            if nums[mid] == target:
                return mid
            else:
                if nums[low] <= nums[mid]:
                    if nums[low] <= target <= nums[mid]:
                        high = mid - 1
                    else:
                        low = mid + 1
                else:
                    if nums[mid] <= target <= nums[high]:
                        low = mid + 1
                    else:
                        high = mid - 1

        return -1
                    

        
```

## Complexity Analysis ⏳
- Time Complexity: O(log N),We eliminate half of the search space in each iteration using binary search.
- Space Complexity: O(1),We use only a few variables (low, high, mid) no extra space used.

