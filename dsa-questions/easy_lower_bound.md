# Lower Bound (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/implement-lower-bound/1)

## Problem Statement
Given a sorted array arr[] (following 0-based indexing) and a number target, find the lower bound of the target in this given array. The lower bound of a number is defined as the smallest index in the sorted array where the element is greater than or equal to the given number.
Note: If all the elements in the given array are smaller than the target, the lower bound will be the length of the array.
Examples :
```
Input:  arr[] = [2, 3, 7, 10, 11, 11, 25], target = 9
Output: 3
Explanation: 3 is the smallest index in arr[] where element (arr[3] = 10) is greater than or equal to 9.
```
```
Input: arr[] = [2, 3, 7, 10, 11, 11, 25], target = 11
Output: 4
Explanation: 4 is the smallest index in arr[] where element (arr[4] = 11) is greater than or equal to 11.
```
```
Input: arr[] = [2, 3, 7, 10, 11, 11, 25], target = 100
Output: 7
Explanation: As no element in arr[] is greater than 100, return the length of array.
```
Constraints:
```
1 ≤ arr.size() ≤ 10^6
1 ≤ arr[i] ≤ 10^6
1 ≤ target ≤ 10^6
```

## Understanding 💡
in a sorted array, we need to return greatest element that is smaller than the target.

## Approach 🚀

As the array is sorted, we will apply the Binary Search algorithm to find the index. The steps are as follows: We will declare the 2 pointers and an ‘ans’ variable initialized to n i.e. the size of the array(as If we don’t find any index, we will return n).- Place the 2 pointers i.e. low and high: Initially, we will place the pointers like this: low will point to the first index, and high will point to the last index.

- Calculate the ‘mid’: Now, we will calculate the value of mid using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division)
- Compare arr[mid] with x: With comparing arr[mid] to x, we can observe 2 different cases:

## Code 🖥️

### Python
```python
class Solution:
    def lowerBound(self, arr, target):
        
        n = len(arr)
        
        low = 0
        high = n-1
        
        ans = n
        
        while low <= high:
            mid = low + (high-low)//2
            
            if arr[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        
        
        return ans
        
```

## Complexity Analysis ⏳
- Time Complexity: O(logn), used for typical binary search
- Space Complexity: O(1), no extra space used
