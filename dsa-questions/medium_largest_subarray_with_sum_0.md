# Largest Subarray with Sum 0 (TUF, GeeksforGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1)

## Problem Statement
Given an array arr[] containing both positive and negative integers, the task is to find the length of the longest subarray with a sum equals to 0.
Note: A subarray is a contiguous part of an array, formed by selecting one or more consecutive elements while maintaining their original order.
Examples:
```
Input: arr[] = [15, -2, 2, -8, 1, 7, 10, 23]
Output: 5
Explanation: The longest subarray with sum equals to 0 is [-2, 2, -8, 1, 7].
```
```
Input: arr[] = [2, 10, 4]
Output: 0
Explanation: There is no subarray with a sum of 0.
```
```
Input: arr[] = [1, 0, -4, 3, 1, 0]
Output: 5
Explanation: The longest subarray with sum equals to 0 is [0, -4, 3, 1, 0]
```
Constraints:
```
1 ≤ arr.size() ≤ 106
−103 ≤ arr[i] ≤ 103
```

## Understanding 💡
Return the length of a subarray that has the sum 0

## Approach 🚀
**Brute Force**
- Initialize a variable `max = 0`, which stores the length of the longest subarray with a sum of 0.
- Traverse the array from the start and initialize a variable `sum = 0`, which stores the sum of the subarray starting with the current index.
- Traverse from the next element of the current index up to the end of the array. Each time, add the element to the sum and check if it is equal to 0.
- If `sum = 0`, check if the length of the subarray so far is greater than `max`, and if yes, update `max`.
- Continue adding elements and repeat the above step until the outer loop completes traversing all elements.
- Finally, return the `max` which holds the length of the longest subarray with a sum of 0.

**Better/Optimal Approach**
- Initialize a variable `sum = 0`, which stores the sum of elements traversed so far, and another variable `max = 0`, which stores the length of the longest subarray with sum zero.
- Declare a `HashMap<Integer, Integer>` to store the prefix sum of every element as a key and its index as a value.
- Traverse the array and add the array element to the `sum`.
- If `sum = 0`, update `max` with the maximum value between `max` and `current_index + 1`, as the subarray from the start to the current index has a sum of 0.
- If `sum` is not equal to zero, check the `HashMap` to see if we've encountered this sum before.
- If the `HashMap` contains the sum, this indicates that a subarray with the same sum exists, so update `max` accordingly.
- If the sum is not found in the `HashMap`, insert `(sum, current_index)` into the `HashMap` to store the prefix sum until the current index.
- After traversing the entire array, the `max` variable will hold the length of the longest subarray with a sum equal to zero. Return `max`.

## Code 🖥️

### Python
```python
class Solution:
    def maxLength(self, arr):
        
        
        """
        brute force can give us O(n^3) and O(n^3)
        where we create all the possible subarrays and calculate the sum
        and then keep comparing the length with an initialized max_length
        and keep updating the max_length if found greater value.
        """
        
        
        """
        better/optimal approach
        using hashmap
        check for the sum-k value in the hashmap. k is 0 here
        """
        hashmp = {}
        
        n = len(arr)
        max_len = 0
        sum = 0
        
        for i in range(len(arr)):
            # calculate the sum
            sum+=arr[i]
            
            # check if the sum is equal to 0
            if sum == 0:
                max_len = max(max_len, i+1)
            
            # check if the sum-k already exist in the hashmap
            if sum in hashmp:
                subarray_len = i - hashmp[sum]
                max_len = max(max_len, subarray_len)
            
            if sum not in hashmp:
                hashmp[sum] = i
    
        
        return max_len
        
```

## Complexity Analysis ⏳
**Brute Force**

- Time Complexity: O(N^2), where N is the size of the array. This is because we are using two nested loops to check all possible subarrays.
- Space Complexity: O(1), as we are not using any additional data structures that grow with input size. We are only using a few variables to store the maximum length and the current sum.

**Better/Optimal Approach**

- Time Complexity: O(n), where n is the length of the string. This is because we are using a single pass through the string with two pointers, leading to linear time complexity.
- Space Complexity: O(1), as we are using a fixed-size hash array of size 256 (for ASCII characters) and not using any additional data structures that grow with input size.
