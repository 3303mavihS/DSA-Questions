# Search Insert Position (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/search-insert-position/)

## Problem Statement
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with `O(log n)` runtime complexity.
Example 1:
```
`Input: nums = [1,3,5,6], target = 5
Output: 2`
```
Example 2:
```
`Input: nums = [1,3,5,6], target = 2
Output: 1`
```
Example 3:
```
`Input: nums = [1,3,5,6], target = 7
Output: 4`
```
Constraints:
- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` contains distinct values sorted in ascending order.
- `-10^4 <= target <= 10^4`

## Understanding 💡
normal search problem but has a restriciton on time complexity of O(log n) making it to use binary search.

## Approach 🚀
We will declare the 2 pointers and an ‘ans’ variable initialized to n i.e. the size of the array(as If we don’t find any index, we will return n).- Place the 2 pointers i.e. low and high: Initially, we will place the pointers like this: low will point to the first index and high will point to the last index.
- Calculate the ‘mid’: Now, we will calculate the value of mid using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division.
- Compare arr[mid] with x: With comparing arr[mid] to x, we can observe 2 different cases:
- The above process will continue until the pointer low crosses high.

## Code 🖥️

### Python
```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        n = len(nums)

        low = 0
        high = n-1

        ans = n 

        while low <= high:
            mid = low + (high-low)//2

            if nums[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
```

## Complexity Analysis ⏳
- Time Complexity: O(logN), where N = size of the given array.
- Space Complexity: O(1) as we are using no extra space.