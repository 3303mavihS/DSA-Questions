# Two Sum : Check if a pair with given sum exists in Array (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/two-sum/description/)

## Problem Statement
Given an array of integers arr[] and an integer target.
**1st variant**: Return YES if there exist two numbers such that their sum is equal to the target. Otherwise, return NO.
**2nd variant**: Return indices of the two numbers such that their sum is equal to the target. Otherwise, we will return {-1, -1}.
Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.
You may assume that each input would have *exactly* one solution, and you may not use the *same* element twice.
You can return the answer in any order.
Example 1:
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```
Example 2:
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```
Example 3:
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Understanding 💡
this question can have two variants where, we can just return that if the values exist as **YES**. or we can just return the indexes or the exact values from the arrays.

## Approach 🚀
**Brute-Force Approach :** for each element we check for the second element to make it the sum target.
**Better Approach :** using hashmap. idea is, for each element store the index as value. but while storing it. we keep checking if the (target - nums[i]) exists or not. and if it exist return.
**Optimal Approach :** only for the first variant. we can use two pointer approach. and keeping the sum of the pointer values and then checking if sum makes ups for it. and moving the left and right pointers.

## Code 🖥️

### Python
```python
from typing import List

def two_sum(nums: List[int], target:int) -> int:

    n = len(nums)
    """
    brute force.
    # pick a number
    # get the remaining number
    # T(n) = O(n^2)
    """
    # for i in range(n):
    #     for j in range(n):
    #         if i == j:
    #             continue
    #
    #         sum = nums[i] + nums[j]
    #
    #         if sum == target:
    #             return i,j
    #
    # return 0

    """
    brute force 
    # slightly better
    # since we will not traverse the whole array.
    # to get another number. 
    # we will traverse remaining array
    # from the point first number appears.
    # still T(n) = O(n^2)
    """
    # for i in range(n):
    #     for j in range(i+1, n):
    #         sum = nums[i] + nums[j]
    #
    #         if sum == target:
    #             return i,j
    #
    # return 0


    """
    better approach (optimal approach for the version where index are required
    # using hashmap
    # for each number there should be rem no.
    # and if we find that no. in the map
    # we return the index
    # T(n) = O(n)
    # S(n) = O(n)
    """

    # hashmp = {}
    #
    # for i in range(n):
    #     rem_target = target - nums[i]
    #
    #     if rem_target in hashmp:
    #         return hashmp[rem_target], i
    #
    #     hashmp[nums[i]] = i
    #
    # return 0

    """
    optimal approach
    # two pointer approach -- only for the version where need to if the values exists
    # in order to return the indexes, need to keep a record of the index.
    # first sort the array
    # keep a pointer at left and at right side of the array
    # shrink the window based on the sum of the pointer values
    # if greater sum than target move the right pointer
    # if lesser sum than target move the left pointer
    """
    # nums.sort()
    #
    # left = 0
    # right = n - 1
    # while left <= right:
    #     sum = nums[left] + nums[right]
    #
    #     if sum == target:
    #         return left, right
    #
    #     if sum < target:
    #         left+=1
    #
    #     if sum > target:
    #         right-=1
    #
    # return 0

# nums = [1, 2, 3, 1, -1, 0, 0, 1, 1, 1]
nums = [10, 5, 2, 7, 1, 3, 11]
# nums = [1, 2, 3]
# nums = [1]
# nums = [1, 0]
# nums = [-1, -1, 1]
print(nums)

target = 14
print(two_sum(nums, target))
```

## Complexity Analysis ⏳
**Brute Force :**
Time Complexity: O(N²) because we use two nested loops to check every possible pair of elements in the array, where N is the size of the array.

Space Complexity: O(1) as we use a constant amount of extra space regardless of input size.
**Better Approach :**
Time Complexity: O(N) because we traverse the array only once, and each lookup or insertion in the hash map takes O(1) on average, where N is the size of the array.

Space Complexity: O(N) since in the worst case we may store all elements of the array in the hash map.
**Optimal Approach :**
Time Complexity: O(N log N) due to sorting the array initially, where N is the number of elements. The two-pointer traversal runs in O(N).

Space Complexity: O(N) because we store the array elements along with their original indices in a separate list or vector for sorting, maintaining original positions.

## Edge Cases 🔍
- ✔️ zeros
- ✔️ negative numbers
