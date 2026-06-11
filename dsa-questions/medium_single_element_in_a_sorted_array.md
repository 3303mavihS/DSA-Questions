# Single Element in a Sorted Array (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/single-element-in-a-sorted-array/description/)

## Problem Statement
You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.
Return *the single element that appears only once*.
Your solution must run in `O(log n)` time and `O(1)` space.
Example 1:
```
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
```
Example 2:
```
Input: nums = [3,3,7,7,10,11,11]
Output: 10
```
Constraints:
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`


## Approach 🚀
The array is sorted, and all elements except one appear exactly twice. If we observe carefully, every pair starts at even index and ends at odd index when the array is still balanced (i.e., before the unique element is encountered).
But once the unique element is inserted, this pairing pattern breaks and the shift happens after that unique element. So we can use this pattern to cut the search space in half using binary search:- If the pairing is proper (i.e., `arr[mid] == arr[mid ^ 1]`), then the unique (non-duplicate) element lies in the right half.
- If the pairing breaks (i.e., `arr[mid] != arr[mid ^ 1]`), then the unique element lies in the left half.
This leads us to an O(log n) solution by binary eliminating half of the array every step.
- Check if the array has only one element, return that element.
- Check if the first element is not equal to the second return the first.
- Check if the last element is not equal to the second last return the last.
- Set two pointers: low = 1, high = n - 2 (excluding boundary elements).
- Run a loop while low ≤ high:
- If no unique element is found (theoretically unreachable), return -1.

## Code 🖥️

### Python
```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        """
        brute will take O(n) time complexity
        in order to take it as O(log n).
        we take care of the first and last element
        check first if they are non duplicates or not
        then we binary search method and 
        shrink the search area based on observation that
        if the mid is at even index and it's pair is on odd
        and vice-versa that means the single element is on the 
        [even, odd] -> single element on right side 
        [odd, even] -> single element on left side
        move the low and high accordingly
        """

        n = len(nums)

        if n == 1:
            return nums[0]

        if nums[0] != nums[1]:
            return nums[0]

        if nums[n-1] != nums[n-2]:
            return nums[n-1]

        low = 1
        high = n-2

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] != nums[mid-1] and nums[mid] != nums[mid+1]:
                return nums[mid]

            if (mid % 2 == 0 and nums[mid] == nums[mid+1]) or (mid % 2 == 1 and nums[mid] == nums[mid-1]):
                low = mid + 1
            else:
                high = mid - 1

        return -1

```

## Complexity Analysis ⏳
Time Complexity: O(logN), N = size of the given array ,as we are basically using the Binary Search algorithm.
Space Complexity: O(1) as we are not using any extra space.
