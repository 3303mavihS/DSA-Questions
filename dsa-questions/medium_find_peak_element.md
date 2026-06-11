# Find Peak Element (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/find-peak-element/description/)

## Problem Statement
A peak element is an element that is strictly greater than its neighbors.
Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
You must write an algorithm that runs in `O(log n)` time.
Example 1:
```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```
Example 2:
```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```
Constraints:
- `1 <= nums.length <= 1000`
- `-231 <= nums[i] <= 231 - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.


## Approach 🚀
we can use binary search algorithm. The primary objective of the Binary Search algorithm is to efficiently determine the appropriate half to eliminate, thereby reducing the search space by half. It does this by determining a specific condition that ensures that the target is not present in that half.
To know how to eliminate the half efficiently, we can clearly notice a striking distinction between the left and right halves of the peak element in the array. The left half of the peak element has an increasing order whereas the right half of the peak element has a decreasing order.
Thus we know that if current element is greater than its left neighbour, we are in the left half and if our current element is greater than its right neighbour then we are in the right half. If we know the half that we are in currently, we can eliminate it to find our peak element.
In addition to the two cases above, we can have two more cases. 
One, where the current element itself is the peak or where the current element is a common point where a decreasing sequence ends and an increasing sequence begins. In either cases we can eliminate any of the halves, as the other half will also contain a peak element.
- Initialize the search space to the full range of the array.
- Find the middle index of the current search range.
- Check if the middle element is greater than its right neighbor.
- If yes, then a peak must exist in the left half (including mid), so shrink the right bound.
- Otherwise, the peak must lie in the right half (excluding mid), so shift the left bound.
- Continue until the search space converges to a single element.
- This final position is the index of a peak element.

## Code 🖥️

### Python
```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)

        if n == 1:
            return 0

        """
        edge cases 1
        if the first number itself is greater than second no.
        we can say it a peak no.
        because of nums[-1] = nums[n] = -∞
        """
        if nums[0] > nums[1]:
            return 0

        """
        edge cases 2
        if the first number itself is greater than second no.
        we can say it a peak no.
        because of nums[-1] = nums[n] = -∞
        """
        if nums[n-1] > nums[n-2]:
            return n-1

        # starting the normal binary search
        low = 1
        high = n - 2

        while low <= high:

            mid = low + (high - low) // 2

            if nums[mid - 1] < nums[mid] > nums[mid + 1]:
                return mid
            
            if nums[mid - 1] < nums[mid]:
                low = mid + 1
            else:
                high = mid - 1

        return -1
```

## Complexity Analysis ⏳
Time Complexity: O(log N), we reduce the search space to half at every step using binary search.
Space Complexity: O(1), constant additional space is used.
