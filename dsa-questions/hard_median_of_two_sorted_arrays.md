
# Median of Two Sorted Arrays (TUF, Leetcode) 🔴

**Difficulty:** Hard

[Problem Link](https://leetcode.com/problems/median-of-two-sorted-arrays/description/)

## Problem Statement
Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.
The overall run time complexity should be `O(log (m+n))`.
Example 1:
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```
Example 2:
```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```
Constraints:
- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-106 <= nums1[i], nums2[i] <= 10^6`


## Approach 🚀
Brute Force:
Merge both sorted arrays into a single sorted array and find the median. 
Time Complexity: O(m + n) 
Space Complexity: O(m + n) 

Optimal Approach: 
Perform Binary Search on the smaller array to find a valid partition. The partition should satisfy: left1 <= right2 left2 <= right1 Once such a partition is found: - If the total number of elements is odd, the median is the maximum element from the left partition. - If the total number of elements is even, the median is the average of the maximum element from the left partition and the minimum element from the right partition.

## Code 🖥️

### Python
```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
            """
            Brute Force:
            Merge both sorted arrays into a single sorted array and find the median.
            Time Complexity: O(m + n)
            Space Complexity: O(m + n)

            Optimal Approach:
            Perform Binary Search on the smaller array to find a valid partition.
            The partition should satisfy:
                left1 <= right2
                left2 <= right1

            Once such a partition is found:
            - If the total number of elements is odd, the median is the maximum
            element from the left partition.
            - If the total number of elements is even, the median is the average
            of the maximum element from the left partition and the minimum
            element from the right partition.

            Time Complexity: O(log(min(m, n)))
            Space Complexity: O(1)
            """

            # Always binary search on the smaller array
            if len(nums1) > len(nums2):
                return self.findMedianSortedArrays(nums2, nums1)

            n1 = len(nums1)
            n2 = len(nums2)

            low = 0
            high = n1

            while low <= high:

                cut1 = low + (high - low) // 2
                cut2 = (n1 + n2 + 1) // 2 - cut1

                left1 = float('-inf') if cut1 == 0 else nums1[cut1 - 1]
                right1 = float('inf') if cut1 == n1 else nums1[cut1]

                left2 = float('-inf') if cut2 == 0 else nums2[cut2 - 1]
                right2 = float('inf') if cut2 == n2 else nums2[cut2]

                # Valid partition found
                if left1 <= right2 and left2 <= right1:

                    # Even total length
                    if (n1 + n2) % 2 == 0:
                        return (
                            max(left1, left2) + min(right1, right2)
                        ) / 2.0

                    # Odd total length
                    return max(left1, left2)

                # Move towards left
                elif left1 > right2:
                    high = cut1 - 1

                # Move towards right
                else:
                    low = cut1 + 1

            return 0.0
```

## Complexity Analysis ⏳
Time Complexity: O(log(min(m, n)))
        Space Complexity: O(1)
