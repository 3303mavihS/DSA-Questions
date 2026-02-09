# Sort an array of 0s, 1s and 2s | Sort colors (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/sort-colors/description/)

## Problem Statement
Given an array nums consisting of only 0, 1, or 2. Sort the array in non-decreasing order. The sorting must be done in-place, without making a copy of the original array.
**or**
Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

## Understanding 💡
need to sort an array having three types of elements. 0, 1, 2. question may refer it to colors also. but basically and unsorted array containing duplicate 0s, 1s and 2s need to be sorted.

## Approach 🚀
**Brute Force Approach :** Just sort it implementing any sorting algorithm.
**Better Approach :** Keep a counters for 0s, 1s and 2s. either fill the array with 0s,1s and 2s or replace the elements with 0s, 1s and 2s.
**Optimal Approach :** Implement Dutch National Flag Algorithm.
We divide the array into three partitions using three pointers – low, mid, and high.- From 0 to low-1, we’ll keep only 0s
- From low to mid-1, only 1s
- From high+1 to n-1, only 2
The range from mid to high is the unsorted zone we’re scanning and fixing. At each step:- If arr[mid] == 0, it belongs to the left section → swap with low, move both low and mid.
- If arr[mid] == 1, it’s already in the middle section → just move mid.
- If arr[mid] == 2, it belongs to the right section → swap with high, only move high.
When you swap with high, you don’t move mid because the incoming value might still be 0 or 2 which needs processing.This ensures we sort the array in one single pass without using extra space.- Start with three pointers at the beginning, middle, and end of the array.
- Iterate while the middle pointer is less than or equal to the end pointer.
- If the current element belongs to the front section:- Swap it with the element at the front boundary.
- Move both front and middle boundaries forward.
- If the current element belongs to the middle section:- Move the middle boundary forward.
- If the current element belongs to the end section:- Swap it with the element at the end boundary.
- Move the end boundary backward.
- Repeat until all elements are in their correct zones.

## Code 🖥️

### Python
```python
from typing import List

def sortColors(nums: List[int]) -> None:
    # print(nums)
    # n = len(nums)

    """
    brute force
    # sort using any sort funtion or algorithm
    """
    # nums.sort()
    # return nums


    """
    better approach
    # we count the no of 0,1,2 in the array
    # either we fill the array again.
    # or we just update the array elements accordingly.
    """
    # One Way

    # count_0 = count_1 = count_2 = 0
    #
    # for num in nums:
    #     if num == 0:
    #         count_0+=1
    #
    #     if num == 1:
    #         count_1+=1
    #
    #     if num == 2:
    #         count_2+=1
    #
    # print(f"0 : {count_0}, 1 : {count_1}, 2 : {count_2}")
    #
    # # now for 0,1,2 run the loop to fill in
    #
    # for i in range(count_0):
    #     nums[i] = 0
    #
    # for i in range(count_0, count_0+count_1):
    #     nums[i] = 1
    #
    # for i in range(count_0+count_1, n):
    #     nums[i] = 2
    #
    # return nums


    # another way
    # count_0 = count_1 = count_2 = 0
    #
    # for num in nums:
    #     if num == 0:
    #         count_0+=1
    #
    #     if num == 1:
    #         count_1+=1
    #
    #     if num == 2:
    #         count_2+=1
    #
    # i = 0
    # while count_0 or count_1 or count_2:
    #     if count_0:
    #         nums[i] = 0
    #         count_0-=1
    #         i+=1
    #         continue
    #
    #     if count_1:
    #         nums[i] = 1
    #         count_1-=1
    #         i+=1
    #         continue
    #
    #     if count_2:
    #         nums[i] = 2
    #         count_2-=1
    #         i+=1
    #         continue
    #
    # return nums

    """
    Optimal Approach
    # Dutch National Flag Algorithm
    # 0, low-1 -> 0
    # low, mid-1 -> 1
    # mid, high-1 -> unsorted array
    # high, n -> 2
    """

    # low = mid = 0
    # high = n-1
    #
    # while mid <= high:
    #     if nums[mid] == 0:
    #         nums[low], nums[mid] = nums[mid], nums[low]
    #         low+=1
    #         mid+=1
    #
    #     elif nums[mid] == 1:
    #         mid+=1
    #
    #     else:
    #         nums[mid], nums[high] = nums[high], nums[mid]
    #         high-=1
    #
    #
    # print(f"low:{low}, mid:{mid}, high:{high}")
    # return nums


nums = [0, 0, 1, 2, 0, 1, 1, 0, 2, 2, 0, 0 ,0, 2]

print(sortColors(nums))

```

## Complexity Analysis ⏳
**Brute Force :**
- T(n) = O(nlogn)
- S(n) = O(n)

**Better Approach :**
- T(n) = O(n)
- S(n) = O(1)

**Optimal Approach :**
- Time Complexity: O(n) The array is traversed only once using the `mid` pointer. Each element is checked at most once, and swaps are done in constant time.
- Space Complexity: O(1) Only a few integer pointers (`low`, `mid`, `high`) are used. Sorting is done in-place, requiring no additional space.

## Edge Cases 🔍
- ✔️ No known edge case
