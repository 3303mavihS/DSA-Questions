# Kadane's Algorithm : Maximum Subarray Sum in an Array (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/maximum-subarray/description/)

## Problem Statement
Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.
Example 1:
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```
Example 2:
```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```
Example 3:
```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

## Understanding 💡
Finding an subarray out of every possible subarray for an array that has the maximum value. Now, the question can ask either for the maximum value of such subarray or the start and end index of that particular subarray.

## Approach 🚀
**Brute Force :** pick and start element and an end element. calculate the sum or that subarray. Your initial value for MAX = float('-inf') will get compared with the sum and update the MAX value if we find the bigger value of sum. In order to return the subarray start and end index. keep two variable with initial index value -1 for both. and update every time the MAX is updated.

**Better Force :** Better than Brute force solution is that instead or selecting the subarray and then calculating the sum and then compare. we pick one element. and keep adding the next element and sum it up. update the MAX value. basically for each element. check the all possible subarrays on the right side. It's same as brute force just the difference is how we write the code.

**Optimal Force :** Using Kadane's Algorithm,
- Iterate through the array using a variable `i`. During each iteration, add the current element `arr[i]` to a running `sum` variable.
- Keep track of the maximum sum encountered during the iteration by comparing the current `sum` with the previous maximum sum, and update it if the current `sum` is greater.
- If at any point the `sum` becomes negative, reset it to 0, as a negative sum won't contribute positively to the overall maximum sum.
- Continue the iteration until all elements in the array are processed.
- Finally, return the maximum sum encountered during the iteration.

## Code 🖥️

### Python
```python
from typing import List

def maxSubArray(nums: List[int]):
    # print(nums)
    n = len(nums)

    """
    Brute Force
    # we calculate sum for all the subarray.
    T(n) = O(n^3)
    S(n) = O(1)
    """
    # max_i = float('-inf')
    # for i in range(n):
    #     for j in range(i, n):
    #         sum = 0
    #         for k in range(i, j+1):
    #             sum+=nums[k]
    #
    #         max_i = max(max_i, sum)
    #
    # return max_i


    """
    better approach
    bring the above solution in O(n^2)
    T(n) = O(n^2)
    S(n) = O(1)
    """
    # max_i = float('-inf')
    # for i in range(n):
    #     sum = 0
    #     for j in range(i, n):
    #         sum+=nums[j]
    #
    #         max_i = max(max_i, sum)
    #
    # return max_i


    """
    optimal approach
    # kadane's algorithm
    T(n) = O(n)
    S(n) = O(1)
    """
    # max_i = float('-inf')
    # sum = 0
    # for i in range(n):
    #     sum+=nums[i]
    #
    #     max_i = max(max_i, sum)
    #
    #     if sum < 0:
    #         sum = 0
    #
    # return max_i

    """
    solution to return the start and end index of the subarray
    """
    # max_i = float('-inf')
    # sum = 0
    # start_idx = -1
    # end_idx = -1
    # for i in range(n):
    #     if sum == 0:
    #         start = i
    #
    #     sum+=nums[i]
    #
    #     if sum > max_i:
    #         max_i = sum
    #         start_idx = start # having and extra start variable helps preserve the previous start_idx value
    #         end_idx = i
    #
    #     if sum < 0:
    #         sum = 0
    #
    # print(nums[start_idx:end_idx])
    #
    # return start_idx, end_idx




nums = [-2, -3, -4, 4, 4, -1, -2, 1, 5, -3]
# nums = [-2, -3, 4, -1, -2, 1, 5, -3]
# nums = [-2, -3]
print(maxSubArray(nums))
```

## Complexity Analysis ⏳
**Brute Force :**

- T(n) : O(n^3)
- S(n) : O(1)

**Better Approach :**
- T(n) : O(n^2)
- S(n) : O(1)

**Optimal Aproach :**
- T(n) : O(n)
- S(n) : o(1)

## Edge Cases 🔍
- No such case of corner cases
