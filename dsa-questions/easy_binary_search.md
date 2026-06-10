# Binary Search (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/binary-search/description/)

## Problem Statement
search an element using binary search

## Understanding 💡
the given array is sorted that means we can determine where the element can exist if we pick an element based on condition. so basically reducing the search area.
- Divide the search space into 2 halves:
In order to divide the search space, we need to find the middle point of it. So, we will take a ‘mid’ pointer and do the following:
mid = (low+high) // 2 ( ‘//’ refers to integer division)
- Compare the middle element with the target:
In this step, we can observe 3 different cases:  - If arr[mid] == target: We have found the target. From this step, we can return the index of the target possibly.
  - If target > arr[mid]: This case signifies our target is located on the right half of the array. So, the next search space will be the right half.
  - If target < arr[mid]: This case signifies our target is located on the left half of the array. So, the next search space will be the left half.
- Trim down the search space:
Based on the probable location of the target we will trim down the search space.

## Approach 🚀
**Loops version**

- Initially, the pointers low and high will be 0 and n-1(*where n = size of the given array*) respectively.
- Now inside a loop, we will perform the 3 steps discussed above in the algorithm section.
- The loop will run until either we fount the target or any of the pointers crosses the other.

**Recursive Way :**

The steps are as follows:
1. Divide the search space into 2 halves:
In order to divide the search space, we need to find the middle point of it. So, we will take a ‘mid’ pointer and do the following:
mid = (low+high) // 2 ( ‘//’ refers to integer division)
2. Compare the middle element with the target and trim down the search space:
In this step, we can observe 3 different cases:  1. If arr[mid] == target: We have found the target. From this step, we can return the index of the target, and the recursion will end.
  - If target > arr[mid]: This case signifies our target is located on the right half of the array. So, the next recursion call will be binarySearch(nums, mid+1, high).
  - If target < arr[mid]: This case signifies our target is located on the left half of the array. So, the next recursion call will be binarySearch(nums, low, mid-1).
3. Base case: The base case of the recursion will be low > high. If (low > high), the search space becomes invalid which means the target is not present in the array.

## Code 🖥️

### Python
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)

        low = 0
        high = n-1

        while low <= high:

            mid = low + (high - low)//2

            if nums[mid] == target:
                return mid
            elif target > nums[mid]:
                low = mid + 1
            else:
                high = mid - 1

        return -1
```

## Complexity Analysis ⏳
- Time Complexity: In the algorithm, in every step, we are basically dividing the search space into 2 equal halves. This is actually equivalent to dividing the size of the array by 2, every time. After a certain number of divisions, the size will reduce to such an extent that we will not be able to divide that anymore and the process will stop. The number of total divisions will be equal to the time complexity. So the overall time complexity is O(logN), where N = size of the given array.
- Space Complexity: 0(1), no extra space being used.
