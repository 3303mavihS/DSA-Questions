# Find out how many times the array has been rotated (TUF, GeeksForGeeks) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/rotation4723/1)

## Problem Statement
Given an increasing sorted rotated array arr[] of distinct integers. The array is right-rotated k times. Find the value of k.
Let's suppose we have an array arr[] = [2, 4, 6, 9], if we rotate it by 2 times it will look like this:
After 1st Rotation : [9, 2, 4, 6]
After 2nd Rotation : [6, 9, 2, 4]
Examples:
```
Input: arr[] = [5, 1, 2, 3, 4]
Output: 1
Explanation: The given array is [5, 1, 2, 3, 4]. The original sorted array is [1, 2, 3, 4, 5]. We can see that the array was rotated 1 times to the right.
```
```
Input: arr = [1, 2, 3, 4, 5]
Output: 0
Explanation: The given array is not rotated.
```
Constraints:
```
1 ≤ arr.size() ≤ 10^5
1 ≤ arr[i] ≤ 10^7
```

## Approach 🚀
Think of the rotated sorted array as two sorted halves the rotation “break” point is where the smallest element lives. Using binary search, we can efficiently zoom in on this smallest element by comparing middle elements to the rightmost element. If the middle element is greater than the rightmost element, the rotation point is to the right. Otherwise, it's to the left or could be the middle itself. This way, we reduce the search space by half each time, getting the rotation count in O(log n).
Imagine searching for the break in a long sorted belt by cutting it in halves repeatedly instead of scanning all the way through.
- Initialize low = 0 and high = n - 1.
- While low is less than high:
- When low meets high, that index is the rotation count (index of smallest element).

## Code 🖥️

### Python
```python
class Solution:
    def findKRotation(self, nums):
        """
        # brute force 
        we check any number where it's prev no. is greater
        we get the index and we tell the rotation
        """
        
        """
        # optimal approach
        same as finding the minimum element
        and return the index of that element
        """
        if len(nums) == 1:
            return 0

        low = 0
        high = len(nums) - 1

        while low <= high:
            # check first if the search area is consecutive
            if high-low == 1:
                if nums[low] > nums[high]:
                    return high
                else:
                    return low
            # if not then
            else:
                # check if the array is already sorted
                # if yes then return the low index value 
                if nums[low] < nums[high]:
                    return low
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
Time Complexity: O(log n),The binary search halves the search space each iteration, where n is the size of the array.
Space Complexity: O(1),Only a few variables are used regardless of input size, so constant extra space.
