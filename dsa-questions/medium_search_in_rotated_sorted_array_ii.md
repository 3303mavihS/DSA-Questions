# Search in Rotated Sorted Array II (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/)

## Problem Statement
There is an integer array `nums` sorted in non-decreasing order (not necessarily with distinct values).
Before being passed to your function, `nums` is rotated at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,4,4,5,6,6,7]` might be rotated at pivot index `5` and become `[4,5,6,6,7,0,1,2,4,4]`.
Given the array `nums` after the rotation and an integer `target`, return `true`* if *`target`* is in *`nums`*, or *`false`* if it is not in *`nums`*.*
You must decrease the overall operation steps as much as possible.
Example 1:
```
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
```
Example 2:
```
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
```
Constraints:
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is guaranteed to be rotated at some pivot.
- `-10^4 <= target <= 10^4`

## Intuition 💡
- First, we identify the sorted half of the array.
- Once found, we determine if the target is located within this sorted half
- If not, we eliminate that half from further consideration.
- Conversely, if the target does exist in the sorted half, we eliminate the other half.
- If arr[low] <= arr[mid]: In this case, we identified that the left half is sorted.
- If arr[mid] <= arr[high]: In this case, we identified that the right half is sorted.

## Approach 🚀
- Place the 2 pointers i.e. low and high: Initially, we will place the pointers like this: low will point to the first index, and high will point to the last index.
- Calculate the ‘mid’: Now, inside a loop, we will calculate the value of ‘mid’ using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division)
- Check if arr[mid] = target: If it is, return True.
- Check if arr[low] = arr[mid] = arr[high]: If this condition is satisfied, we will just increment the low pointer and decrement the high pointer by one step. We will not perform the later steps until this condition is no longer satisfied. So, we will continue to the next iteration from this step.
- Identify the sorted half, check where the target is located, and then eliminate one half accordingly:
- Otherwise, if the right half is sorted:
- Once, the ‘mid’ points to the target, we will return True.
- This process will be inside a loop and the loop will continue until low crosses high. If no element is found, we will return False.

## Code 🖥️

### Python
```python
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        """
        the array contains duplicates and not distict
        that means we can not just solve it by looking
        at left and right.
        we must shrink the search space. whenever the low, mid and high
        are same
         and then search 
        by applying binary search
        """

        low = 0
        high = len(nums) - 1

        while low <= high:

            mid = low + (high - low)//2

            if nums[mid] == target:
                return True
            else:
                # shrink the search space
                if nums[low] == nums[mid] == nums[high]:
                    low+=1
                    high-=1
                    continue
                # continue in left sorted part
                elif nums[low] <= nums[mid]:
                    if nums[low] <= target <= nums[mid]:
                        high = mid - 1   
                    else:
                        low = mid + 1
                # continue in right sorted part
                else:
                    if nums[mid] <= target <= nums[high]:
                        low = mid + 1
                    else:
                        high = mid - 1

        return False 
```

## Complexity Analysis ⏳
Time Complexity: O(logN) for the best and average case. O(N/2) for the worst case. Here, N = size of the given array.
Space Complexity: O(1), no extra space used
