# Split Array Largest Sum (TUF, Leetcode) 🔴

**Difficulty:** Hard

[Problem Link](https://leetcode.com/problems/split-array-largest-sum/description/)

## Problem Statement
Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty subarrays such that the largest sum of any subarray is minimized.
Return *the minimized largest sum of the split*.
A subarray is a contiguous part of the array.
Example 1:
```
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
```
Example 2:
```
Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.
```
Constraints:
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= min(50, nums.length)`

## Understanding 💡
using the same logic from book allocation ques we figure out the range for linear/binary search and use elements from range we calculate how many subarrays can be created. and return min. no.

## Approach 🚀
We are going to use the Binary Search algorithm to optimize the approach.
The primary objective of the Binary Search algorithm is to efficiently determine the appropriate half to eliminate, thereby reducing the search space by half. It does this by determining a specific condition that ensures that the target is not present in that half.

- Place the 2 pointers i.e. low and high: Initially, we will place the pointers. The pointer low will point to max(arr[]) and the high will point to sum(arr[]).
- Calculate the ‘mid’: Now, inside the loop, we will calculate the value of ‘mid’ using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division.
- Eliminate the halves based on the number of subarrays returned by countPartitions(): We will pass the potential value of ‘maxSum’, represented by the variable 'mid', to the ‘countPartitions()' function. This function will return the number of partitions we can make.
    - If partitions > k: On satisfying this condition, we can conclude that the number ‘mid’ is smaller than our answer. So, we will eliminate the left half and consider the right half(i.e. low = mid+1).
    - Otherwise, the value mid is one of the possible answers. But we want the minimum value. So, we will eliminate the right half and consider the left half(i.e. high = mid-1).
- Finally, outside the loop, we will return the value of low as the pointer will be pointing to the answer.



## Code 🖥️

### Python
```python
class Solution:
    def calculateSubarrays(self, nums, k, splitValue):
        countSubarray = 1
        eleSum = 0

        for ele in nums:
            if eleSum + ele <= splitValue:
                eleSum+=ele
            else:
                countSubarray+=1
                eleSum = ele

        return countSubarray


    def splitArray(self, nums, k):
        """
        same pattern as book allocation
        min of max type
        returning the largest num that can help split the 
        array in given k subarrays
        """

        """
        using the same logic from book allocation ques
        we figure out the range for linear/binary search
        and use elements from range we calculate how many
        subarrays can be created. and return min. no. 
        """

        if len(nums) < k:
            return -1

        low = max(nums)
        high = sum(nums)

        while low <= high:
            mid = low + (high - low) // 2

            if self.calculateSubarrays(nums, k, mid) <= k:
                high = mid - 1
            else:
                low = mid + 1

        return low
        
```

## Complexity Analysis ⏳
Time Complexity: O(N * log(sum(arr[])-max(arr[])+1)), where N = size of the array, sum(arr[]) = sum of all array elements, max(arr[]) = maximum of all array elements.
Space Complexity: O(1), no extra space used

