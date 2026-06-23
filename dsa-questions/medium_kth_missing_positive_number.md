# Kth Missing Positive Number (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/kth-missing-positive-number/description/)

## Problem Statement
Given an array `arr` of positive integers sorted in a strictly increasing order, and an integer `k`.
Return *the* `kth` *positive integer that is missing from this array.*
Example 1:
```
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
```
Example 2:
```
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.
```
Constraints:
- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`
- `1 <= k <= 1000`
- `arr[i] < arr[j]` for `1 <= i < j <= arr.length`

## Understanding 💡
need to return the value of the kth missing positive integer. an array is given in strictyly increasing order and we need to return the kth missing positive integer. that means the out of all missing integers, we need to pick the kth integer. the integer can be between the array itself, or the before or after the array.

## Approach 🚀
We cannot apply binary search on the answer space here as we cannot assure which missing number has the possibility of being the kth missing number. That is why, we will do something different here. We will try to find the closest neighbors (i.e. Present in the array) for the kth missing number by counting the number of missing numbers for each element in the given array.
### Algorithm
- Start by setting two markers: one at the beginning and one at the end of the list.
- Keep checking the middle position between the two markers by taking their average.
- Count how many numbers are missing up to that middle position by subtracting the expected number from the actual number found at that point.
    - If the number of missing values is less than the desired position, move your focus to the right side of the list by shifting the beginning marker ahead.
    - If not, move your focus to the left side by shifting the end marker backward.
- Once you've narrowed down the search and exited the loop, return the final answer by adding the desired position to the last marker you checked (plus one).

## Code 🖥️

### Python
```python
class Solution:
    def findKthPositive(self, arr: List[int], k: int) -> int:
        """
        need to return the value of the kth missing positive integer.
        an array is given in strictyly increasing order
        and we need to return the kth missing positive integer.
        that means the out of all missing integers, we need to pick the
        kth integer. the integer can be between the array itself, or the 
        before or after the array.
        """


        """
        brute force
        we start the loop from 1 and keep adding 1 to k 
        every time we find the element in the array
        """


        """
        optimal approach
        instead of running the loop on a particular range.
        we use binary search on the array itself in order to figure out the range
        where the kth missing integer must be present. so that we can then calulate
        the missing integer. we shrink the search area by calculating the missing
        intergers from 1 till that arr[mid] element. based on that we move the
        low and high pointer
        """

        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = low + (high - low) // 2

            missing_int_count =  arr[mid] - (mid + 1)

            if missing_int_count < k:
                low = mid + 1
            else:
                high = mid - 1

        return high + k + 1


```

## Complexity Analysis ⏳
- Time Complexity: O(logn), used for typical binary search
- Space Complexity: O(1), no extra space used
