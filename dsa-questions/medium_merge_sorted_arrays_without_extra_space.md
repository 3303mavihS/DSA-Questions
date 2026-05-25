# Merge Sorted Arrays Without Extra Space (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1)

## Problem Statement
Given two sorted arrays a[] and b[] of size n and m respectively, the task is to merge them in sorted order without using any extra space. Modify a[] so that it contains the first n elements and modify b[] so that it contains the last m elements.
Examples:
```
Input: a[] = [2, 4, 7, 10], b[] = [2, 3]
Output: a[] = [2, 2, 3, 4], b[] = [7, 10]
Explanation: After merging the two non-decreasing arrays, we get, [2, 2, 3, 4, 7, 10]
```
```
Input: a[] = [1, 5, 9, 10, 15, 20], b[] = [2, 3, 8, 13]
Output: a[] = [1, 2, 3, 5, 8, 9], b[] = [10, 13, 15, 20]
Explanation: After merging two sorted arrays we get [1, 2, 3, 5, 8, 9, 10, 13, 15, 20].
```
```
Input: a[] = [0, 1], b[] = [2, 3]
Output: a[] = [0, 1], b[] = [2, 3]
Explanation: After merging two sorted arrays we get [0, 1, 2, 3].
```
Constraints:
```
1 ≤ n, m ≤ 105
0 ≤ a[i], b[i] ≤ 107
```

## Understanding 💡
No need to return a new array having all the elements. instead sort the array using the same given arrays.

## Approach 🚀
### Brute Force Approach
In the brute force approach, we use an extra array to store all elements from both sorted arrays. After combining them, we sort the new array completely and then copy the first `n` elements back to the first array and the remaining `m` elements to the second array. This approach is simple and easy to understand because it directly relies on sorting the combined data, but it uses extra space proportional to the total number of elements.
### Better Approach
In the better approach, we compare the largest elements of the first array with the smallest elements of the second array. If an element in the first array is greater than an element in the second array, we swap them. We continue moving inward from both sides until all smaller elements are shifted toward the first array and larger elements toward the second array. After this rearrangement, both arrays are sorted individually. The main idea is that we first place elements in approximately correct arrays before finally sorting them internally.
### Optimal Approach (Gap Method)
The optimal approach uses the Shell Sort idea with a changing gap value. We treat both arrays as one virtual combined array and compare elements that are a certain `gap` distance apart. If the left element is greater than the right one, we swap them. After one full traversal, the gap is reduced and the process repeats until the gap becomes `1`. Large gaps help move misplaced elements quickly, while smaller gaps gradually refine the ordering. This method efficiently merges both arrays without using any extra space.

## Code 🖥️

### Python
```python
from typing import List

def swap_if_greater(arr1, arr2, idx1, idx2):
    if arr1[idx1] > arr2[idx2]:
        arr1[idx1], arr2[idx2] = arr2[idx2], arr1[idx1]

def merge_in_place(nums1 : List[int], n : int, nums2 : List[int], m : int) -> None:

    """
    brute force
    initialize n+m length array
    merge the nums1 and nums2 into ans
    and again push the sorted merged value back to nums1 and nums2
    """
    # merged_arr = []
    # i = j = 0
    #
    # # merge as much as possible
    # while i < n and j < m:
    #     if nums1[i] <= nums2[j]:
    #         merged_arr.append(nums1[i])
    #         i+=1
    #     elif nums2[j] <= nums1[i]:
    #         merged_arr.append(nums2[j])
    #         j+=1
    #
    # # if nums1 has elements left
    # while i < n:
    #     merged_arr.append(nums1[i])
    #     i+=1
    #
    # # if nums2 has elements left
    # while j < m:
    #     merged_arr.append(nums2[j])
    #     j+=1
    #
    # # print(merged_arr)
    #
    # # now copy the merged array back to nums1
    # for i in range(len(merged_arr)):
    #     nums1[i] = merged_arr[i]


    """
    better/optimal approach
    # Approach 1
    we know that both the arrays are sorted
    that means the last element of both the array will be the greatest.
    we pick last from array 1 and first element from array 2
    compare them and swap them and move to their prev/next element and compare them
    this way we will move all the smaller elements on one side and greater elements on another side.
    so if we focus we will realise the swap will only happen when nums2 array have elements that are smaller
    than the elements on nums1 array. and when swap couldn't happen that means we have reached to the answer
    sort the arrays and that's it.
    """
    # i = n - 1
    # j = 0
    #
    # while i >= 0 and j < m:
    #     if nums1[i] > nums2[j]:
    #         nums1[i], nums2[j] = nums2[j], nums1[i]
    #
    #     i-=1
    #     j+=1
    #
    # # print(n,m)
    # for i in range(n, n+m):
    #     print(i)
    #     nums1[i] = nums2[i-n]
    #
    # nums1.sort()
    # print(nums1)


    """
    better/optimal approach
    # Approach 2
    using shell sort approach
    
    """
    total = n + m
    gap = (total // 2) + (total % 2)

    while gap > 0:

        left = 0
        right = left + gap

        while right < total:
            # left in nums1, right in nums2
            if left < n <= right:
                swap_if_greater(nums1, nums2, left, right - n)

            # both in nums2
            elif left >= n:
                swap_if_greater(nums2, nums2, left - n, right - n)

            # both in nums1
            else:
                swap_if_greater(nums1, nums1, left, right)

            left += 1
            right += 1

        if gap == 1:
            break

        gap = (gap // 2) + (gap % 2)

    for i in range(n, n+m):
        nums1[i] = nums2[i-n]

    print(nums1)



nums1 = [1,2,3,0,0,0]
n = 3
nums2 = [2,5,6]
m = 3


merge_in_place(nums1, n, nums2, m)
```

## Complexity Analysis ⏳
### Brute Force Approach
- **Time Complexity:** `O((n + m) log(n + m))`
We combine both arrays and sort the merged array.
- **Space Complexity:** `O(n + m)`
Extra space is used to store the merged array.
### Better Approach
- **Time Complexity:** `O(min(n, m)) + O(n log n) + O(m log m)`
Swapping takes linear time, and then both arrays are sorted individually.
- **Space Complexity:** `O(1)`
No extra array is used.
### Optimal Approach (Gap Method)
- **Time Complexity:** `O((n + m) log(n + m))`
The gap reduces logarithmically, and for each gap we traverse the combined arrays once.
- **Space Complexity:** `O(1)`
Sorting and merging are done completely in-place without extra space.


