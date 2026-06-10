# Ceil in a Sorted Array (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1)

## Problem Statement
Given a sorted array arr[] and an integer x, find the index (0-based) of the smallest element in arr[] that is greater than or equal to x. This element is called the ceil of x. If such an element does not exist, return -1.
Note: In case of multiple occurrences of ceil of x, return the index of the first occurrence.
Examples
```
Input: arr[] = [1, 2, 8, 10, 11, 12, 19], x = 5
Output: 2
Explanation: Smallest number greater than 5 is 8, whose index is 2.
```
```
Input: arr[] = [1, 2, 8, 10, 11, 12, 19], x = 20
Output: -1
Explanation: No element greater than 20 is found. So output is -1.
```
```
Input: arr[] = [1, 1, 2, 8, 10, 11, 12, 19], x = 0
Output: 0
Explanation: Smallest number greater than 0 is 1, whose indices are 0 and 1. The index of the first occurrence is 0.
```
Constraints:
```
1 ≤ arr.size() ≤ 10^6
1 ≤ arr[i] ≤ 10^6
0 ≤ x ≤ arr[n-1]
```

## Understanding 💡
returning the ceil value for a given target value.

## Approach 🚀
We will declare the 2 pointers and an ‘ans’ variable initialized to -1(If we don’t find any index, we will return -1).
- Place the 2 pointers i.e. low and high: Initially, we will place the pointers like this: low will point to the first index and high will point to the last index.
- Calculate the ‘mid’: Now, we will calculate the value of mid using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division)
- Compare arr[mid] with x: With comparing arr[mid] to x, we can observe 2 different cases:
    - Case 1 - If arr[mid] <= x: The index arr[mid] is a possible answer. So, we will store it and will try to find a larger number that satisfies the same condition. That is why we will remove the left half and try to find the number in the right half.
    - Case 2 - If arr[mid] > x: arr[mid] is definitely not the answer and we need a smaller number. So, we will reduce the search space to the left half by removing the right half.

## Code 🖥️

### Python
```python
#User function Template for python3
class Solution:
    def findCeil(self, arr, target):
        n = len(arr)
        
        low = 0
        high = n-1
        
        ans = -1
        
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
- Time Complexity:O(logN), where N = size of the given array. We are using the Binary Search algorithm
- Space Complexity: O(1). No extra space used
