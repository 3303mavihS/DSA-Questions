# K-th element of two Arrays (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1)

## Problem Statement
Given two sorted arrays a[] and b[] and an element k, the task is to find the element that would be at the kth position of the combined sorted array.
Examples :
```
Input: a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
Output: 6
Explanation: The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.
```
```
Input: a[] = [1, 4, 8, 10, 12], b[] = [5, 7, 11, 15, 17], k = 6
Output: 10
Explanation: Combined sorted array is [1, 4, 5, 7, 8, 10, 11, 12, 15, 17]. The 6th element of this array is 10.
```
Constraints:
`1 ≤ a.size(), b.size() ≤ 10^6`
`1 ≤ k ≤ a.size() + b.size()`
`0 ≤ a[i], b[i] ≤ 10^8`

## Understanding 💡
Just like the median for two sorted arrays question pattern. here in this question we need to return the kth element from the array by keeping the time complexity to minimal as well as space complexity.

## Approach 🚀
- First, ensure that arr1 is the smaller array. If not, swap the arrays. Our goal is to treat arr1[] as the smaller array.
- Calculate the length of the left half as left = k.
- Initialize two pointers:  - low will point to max(0, k - n2),
  - high will point to min(k, n1) (n1 is the size of the smaller array and n2 is the size of the larger array).
- Calculate 'mid1' and 'mid2':  - mid1 = (low + high) // 2 (integer division),
  - mid2 = left - mid1.
- Inside the loop, calculate l1, l2, r1, and r2:  - l1 = arr1[mid1 - 1],
  - l2 = arr2[mid2 - 1],
  - r1 = arr1[mid1],
  - r2 = arr2[mid2].
  - If mid1 or mid2 is out of bounds, set l1, l2 to INT_MIN and r1, r2 to INT_MAX.
- Eliminate halves based on the following conditions:  - If l1 <= r2 and l2 <= r1, the answer is found. Return the maximum of l1 and l2.
  - If l1 > r2, eliminate the right half by setting high = mid1 - 1.
  - If l2 > r1, eliminate the left half by setting low = mid1 + 1.
- When the loop terminates, include a dummy return statement to avoid warnings or errors.

## Code 🖥️

### Python
```python
class Solution:
    def kthElement(self, nums1, nums2, k):
        
        # based on median of two sorted array question
        # instead of returning the median we return the kth element.
        
        # Always binary search on the smaller array
        if len(nums1) > len(nums2):
            return self.kthElement(nums2, nums1, k)

        n1 = len(nums1)
        n2 = len(nums2)
        n = n1 + n2

        low = max(k-n2, 0)
        high = min(k, n1)
        
        left = k
        
        

        while low <= high:

            cut1 = low + (high - low) // 2
            cut2 = left - cut1

            left1 = float('-inf')
            right1 = float('inf')

            left2 = float('-inf')
            right2 = float('inf')

            
            if cut1 < n1:
                right1 = nums1[cut1]
                
            if cut2 < n2:
                right2 = nums2[cut2]
                
            if cut1 - 1 >= 0:
                left1 = nums1[cut1 - 1]  
                
            if cut2 - 1 >= 0:
                left2 = nums2[cut2 - 1]
                
                
            if left1 <= right2 and left2 <= right1:
                return max(left1, left2)
            elif left1 > right2:
                high = cut1 - 1
            else:
                low = cut1 + 1
                
                

        return 0
```

## Complexity Analysis ⏳
Time Complexity: O(log(min(M, N))), where M and N are the sizes of the two given arrays. As binary search is being applied on the range [max(0, k - N2), min(k, N1)], the range length <= min(M, N).
Space Complexity: O(1), as no additional space is used.

