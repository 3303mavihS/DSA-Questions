# Count Inversions (TUF, GeeksForGeeks) 🔴

**Difficulty:** Hard

[Problem Link](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1)

## Problem Statement
Given an array of integers arr[]. You have to find the Inversion Count of the array.
Note : Inversion count is the number of pairs of elements (i, j) such that i < j and arr[i] > arr[j].
Examples:
```
Input: arr[] = [2, 4, 1, 3, 5]
Output: 3
Explanation: The sequence 2, 4, 1, 3, 5 has three inversions (2, 1), (4, 1), (4, 3).
```
```
Input: arr[] = [2, 3, 4, 5, 6]
Output: 0
Explanation: As the sequence is already sorted so there is no inversion count.
```
```
Input: arr[] = [10, 10, 10]
Output: 0
Explanation: As all the elements of array are same, so there is no inversion count.
```
Constraints:
1 ≤ arr.size() ≤ 105
1 ≤ arr[i] ≤ 104

## Understanding 💡
Return the number of such pair where arr[i]>arr[j] but i<j.

## Approach 🚀
**Brute Force :**

- Initialize a counter `cnt = 0`.
- Use two nested loops:  - Outer loop runs for each element `a[i]`.
    - Inner loop checks all elements `a[j]` where `j > i`.
    - If `a[i] > a[j]`, increment `cnt`.
- After traversing all pairs, return `cnt` as the number of inversions.

**Better/Optimal approach:**

- Apply merge sort recursively to divide the array into two halves.
- During the merge step:  - If `arr[left] <= arr[right]`, place `arr[left]` into the temp array and move `left++`.
  - Otherwise, place `arr[right]` into the temp array. Since `arr[left] > arr[right]`, all elements from `arr[left]` to `arr[mid]` form inversions with `arr[right]`. So add `(mid - left + 1)` to the inversion count.
- Copy the merged elements back into the original array.
- The total inversion count is the sum of:  - Inversions in the left half
  - Inversions in the right half
  - Inversions across the halves (counted during merge)

## Code 🖥️

### Python
```python
from typing import List

def merge_sort(nums:List[int], left, right) -> int:
    cnt = 0

    if left >= right:
        return cnt

    mid = (left + right) // 2

    cnt += merge_sort(nums, left, mid)
    cnt += merge_sort(nums, mid+1, right)
    cnt += merge(nums, left, mid, right)

    return cnt


def merge(nums: List[int], low, mid, high):
    # temp array
    temp = []

    # Starting indices of left and right halves
    left = low
    right = mid + 1

    # Variable to count inversions
    cnt = 0

    # Merge elements in sorted order
    while left <= mid and right <= high:
        if nums[left] <= nums[right]:
            temp.append(nums[left])
            left+=1
        else:
            temp.append(nums[right])
            cnt += (mid - left + 1)
            right += 1

    # Copy remaining elements of left half
    while left <= mid:
        temp.append(nums[left])
        left += 1

    # Copy remaining elements of right half
    while right <= high:
        temp.append(nums[right])
        right += 1

    # Copy back to original array
    for i in range(low, high + 1):
        nums[i] = temp[i - low]

    return cnt


def count_inversion(nums:List[int]) -> int:
    n = len(nums)

    if n == 0:
        return 0

    # """
    # #Brute Force
    # counting all the pairs which matches the condition
    # with O(n^2)
    # may get Time Limit Exceeded with bigger input values
    # """
    #
    # count = 0
    # for i in range(n):
    #     for j in range(i, n):
    #         if nums[i] > nums[j]:
    #             count += 1
    #
    # return count


    """
    # Better/Optimal Approach
    merge sort solution
    while merging the array in sorted way.
    """
    count = 0
    count += merge_sort(nums, 0, len(nums) - 1)

    return count

nums = [2, 3, 4, 5, 6]
nums = [2, 4, 1, 3, 5]

print(count_inversion(nums))
```

## Complexity Analysis ⏳
**Brute Approach :**

- Time Complexity: O(N2), as every pair is checked.
- Space Complexity: O(1), since no extra space is used apart from variables.

**Optimal Approach :**

- Time Complexity: O(N log N), since it is based on merge sort.
- Space Complexity: O(N), for the temporary array used during merging.
