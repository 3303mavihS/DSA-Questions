# The Painter's Partition Problem-II (TUF, GeeksForGeeks) 🔴

**Difficulty:** Hard

[Problem Link](https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1)

## Problem Statement
Given an array arr[] where each element denotes the length of a board, and an integer k representing the number of painters available. Each painter takes 1 unit of time to paint 1 unit length of a board.
Determine the minimum amount of time required to paint all the boards, under the constraint that each painter can paint only a contiguous sequence of boards (no skipping or splitting allowed).
Examples:
```
Input: arr[] = [5, 10, 30, 20, 15], k = 3
Output: 35
Explanation: The optimal allocation of boards among 3 painters is -
Painter 1 → [5, 10] → time = 15
Painter 2 → [30] → time = 30
Painter 3 → [20, 15] → time = 35
Job will be done when all painters finish i.e. at time = max(15, 30, 35) = 35
```
```
Input: arr[] = [10, 20, 30, 40], k = 2
Output: 60
Explanation: A valid optimal partition is -
Painter 1 → [10, 20, 30] → time = 60
Painter 2 → [40] → time = 40
Job will be complete at time = max(60, 40) = 60
```
```
Input: arr[] = [100, 200, 300, 400], k = 1
Output: 1000
Explanation: There is only one painter, so the painter must paint all boards sequentially. The total time taken will be the sum of all board lengths, i.e., 100 + 200 + 300 + 400 = 1000.
```
Constraints:
`1 ≤ arr.size() ≤ 10^5`
`1 ≤ arr[i] ≤ 10^4`
`1 ≤ k ≤ 10^5`

## Understanding 💡
same pattern as book allocation min of max type returning the largest num that can help split the array in given k subarrays. using the same logic from book allocation ques we figure out the range for linear/binary search and use elements from range we calculate how many subarrays can be created. and return min. no.

## Approach 🚀
- Place the 2 pointers i.e. low and high: Initially, we will place the pointers. The pointer low will point to max(arr[]) and the high will point to sum(arr[]).
- Calculate the ‘mid’: Now, inside the loop, we will calculate the value of ‘mid’ using the following formula: mid = (low+high) // 2 ( ‘//’ refers to integer division.
- Eliminate the halves based on the number of painters returned by countPainters(): We will pass the potential value of time, represented by the variable 'mid', to the ‘countPainters()' function. This function will return the number of painters we need to paint all the boards
    - If painters > k: On satisfying this condition, we can conclude that the number ‘mid’ is smaller than our answer. So, we will eliminate the left half and consider the right half(i.e. low = mid+1).
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
        
        
    def minTime (self, arr, k):
        return self.splitArray(arr, k)
        
```

## Complexity Analysis ⏳
- Time Complexity: O(N * log(sum(arr[])-max(arr[])+1)), where N = size of the array, sum(arr[]) = sum of all array elements, max(arr[]) = maximum of all array elements.
- Space Complexity: O(1), no extra space used

