# Longest Subarray with given Sum K(Positives) (TUF, GeeksforGeeks) 🟡

**Difficulty :** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1)

## Problem Statement
Given an array `arr[]` containing integers and an integer `k`, your task is to find the length of the longest subarray where the sum of its elements is equal to the given value `k`. If there is no subarray with sum equal to `k`, return `0`.

Examples:
```
Input: arr[] = [10, 5, 2, 7, 1, -10], k = 15
Output: 6
Explanation: Subarrays with sum = 15 are [5, 2, 7, 1], [10, 5] and [10, 5, 2, 7, 1, -10]. The length of the longest subarray with a sum of 15 is 6.
```
```
Input: arr[] = [-5, 8, -14, 2, 4, 12], k = -5
Output: 5
Explanation: Subarrays with sum = -5 are [-5] and [-5, 8, -14, 2, 4]. The length of the longest subarray with a sum of -5 is 5.
```
```
Input: arr[] = [10, -10, 20, 30], k = 5
Output: 0
Explanation: No subarray with sum = 5 is present in arr[].
```

## Understanding 💡
need to return the length of a subarray that has the sum equal to given k. the array can have multiple subarray with the sum as k. but we need to only return the max length of an subarray.

## Approach 🚀
can be approach in three ways with different time complexity and space complexity. but based on the array like if it consists 0 or negative numbers.
In brute force and optimal approach can only handle positive number array. if the array consists the 0 and -ve number the better approach works.

**Brute Force :**
- We first run a loop with index `i` to select every possible starting index of the subarray. These starting indices range from `0` to `n-1` where `n` is the size of the array.
- Inside this loop, we run another loop with index `j` to select the ending index of the subarray. For each subarray starting at index `i`, the ending index `j` can range from `i` to `n-1`.
- Next, for each subarray starting from index `i` and ending at index `j` (i.e., `arr[i...j]`), we run an additional loop to calculate the sum of all the elements in that subarray.
- If the sum equals `k`, we consider its length, which is `(j - i + 1)`. Among all such subarrays, we keep track of the maximum length by comparing all the lengths found so far.

**Better Approach :**
- Using prefix sum + hashmap. go through the array once and keep add each element to sum.
- now for new sum check if its equal get the length of the subarray. (helps in getting initial max length)
- next calculate the sum - k. and check if hash_map has any value for sum-k.
- if it exists in the hashmap that means we have a new subarray with sum as k.
- compare the new length with the existing max_len.
- and add the new sum in the hashmap.

**Optimal Approach :**
- Two pointers, `left` and `right`, are used to maintain the current window of elements in the array. These pointers represent the start and end of the current subarray.
- A variable, `sum`, is used to keep track of the sum of the elements in the current window between `left` and `right`.
- The `right` pointer expands the window by including new elements, increasing the `sum`.
- If the sum of the window exceeds `k`, the `left` pointer shrinks the window by removing elements from the start until the sum is less than or equal to `k`.
- If the sum of the current window equals `k`, the maximum length of such a subarray is updated.
- The process continues until the `right` pointer traverses the entire array.
- Finally, the maximum length of the subarray with sum `k` is returned as the result.

## Code 🖥️

### Python
```python
from typing import List

def subarray_sum(nums: List[int], k: int) -> int:

    """
    # brute force approach
    # get sum for each possible subarray
    # O(n^3)
    """
    # max_len = 0
    # for x in range(len(nums)):
    #     for y in range(len(nums)):
    #         sum = 0
    #         for z in range(x, y+1):
    #             sum+=nums[z]
    #
    #         if sum == k:
    #             max_len = max(max_len, y-x+1)
    #
    # return max_len

    """
    # brute force approach
    # O(n^2)
    """
    # max_len = 0
    # for x in range(len(nums)):
    #     sum=0
    #     for y in range(x,len(nums)):
    #         sum+=nums[y]
    # 
    #     if sum == k:
    #         max_len = max(max_len, y-x+1)
    # 
    # return max_len


    """
    better approach
    # using hash map
    """
    # hash_mp = {}
    #
    # sum = 0
    # max_len = 0
    # for i in range(len(nums)):
    #     sum += nums[i]
    #
    #     if sum == k: # helps in getting the initial max_len of subarray
    #         max_len = max(max_len, i+1)
    #
    #     rem = sum - k # get the sum without k
    #
    #     if rem in hash_mp: # check if the value exists in the hashmap (a subarray with the sum)
    #         subarray_len = i - hash_mp[rem] # if the remaining sum exists that means we can get a new mid subarray with sum equal to k
    #         max_len = max(max_len, subarray_len) # update the max_len value
    #
    #     if sum not in hash_mp:
    #         hash_mp[sum] = i
    # print(hash_mp)
    # return max_len

    """
    optimal approach
    # 2 pointer approach
    """
    # n = len(nums)
    #
    # # To store the maximum length of the subarray
    # maxLen = 0
    #
    # # Pointers to mark the start and end of window
    # left = 0
    # right = 0
    #
    # # To store the sum of elements in the window
    # sum = nums[0]
    #
    # # Traverse all the elements
    # while right < n:
    #
    #     # If the sum exceeds K, shrink the window
    #     while left <= right and sum > k:
    #         sum -= nums[left]
    #         left += 1
    #
    #     # Store the maximum length
    #     if sum == k:
    #         maxLen = max(maxLen, right - left + 1)
    #
    #     right += 1
    #     if right < n:
    #         sum += nums[right]
    #
    # return maxLen

# nums = [1, 2, 3, 1, -1, 0, 0, 1, 1, 1]
nums = [10, 5, 2, 7, 1, -10, -5]
# nums = [1, 2, 3]
# nums = [1]
# nums = [1, 0]
# nums = [-1, -1, 1]
print(nums)

k = 14
print(subarray_sum(nums, k))
```

## Complexity Analysis ⏳
**Brute :**

Time Complexity: O(n3), where n is the size of the array. This is because we have three nested loops: one for the starting index, one for the ending index, and one for calculating the sum of the subarray.

Space Complexity: O(1), as we are using a constant amount of space for variables and not using any additional data structures that grow with input size.

**Better :**

Time Complexity: O(n)

Space Complexity: O(n)

**Optimal Approach :**

Time Complexity: O(N), where N is the size of the array. The algorithm traverses the array once with two pointers, making it linear in time complexity.

Space Complexity: O(1), as it uses a constant amount of space.

## Edge Cases 🔍
✔️ array can have negative and zeros. handling them is also needed. Optimal Solution won't work for negative and zero.
