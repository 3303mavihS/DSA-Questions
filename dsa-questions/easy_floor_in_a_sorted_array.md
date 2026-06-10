# Floor in a Sorted Array (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1)

## Problem Statement
Given a sorted array arr[] and an integer x, find the index (0-based) of the largest element in arr[] that is less than or equal to x. This element is called the floor of x. If such an element does not exist, return -1.
Note: In case of multiple occurrences of floor of x, return the index of the last occurrence.
Examples
```
Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 5
Output: 1
Explanation: Largest number less than or equal to 5 is 2, whose index is 1.
```
```
Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 11
Output: 4
Explanation: Largest Number less than or equal to 11 is 10, whose indices are 3 and 4. The index of last occurrence is 4.
```
```
Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 0
Output: -1
Explanation: No element less than or equal to 0 is found. So, output is -1.
```
Constraints:
```
1 ≤ arr.size() ≤ 10^6
1 ≤ arr[i] ≤ 10^6
0 ≤ x ≤ arr[n-1]
```

## Understanding 💡
need to return a floor value for a target.

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
class Solution:
    def findFloor(self, arr, target):
        n = len(arr)
        
        low = 0
        high = n-1
        
        ans = -1
        
        while low <= high:
            
            mid = low + (high-low)//2
            
            if arr[mid] <= target:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        
        return ans
```

## Complexity Analysis ⏳
- Time Complexity : O(log n)
- Space Complexity : O(1)
