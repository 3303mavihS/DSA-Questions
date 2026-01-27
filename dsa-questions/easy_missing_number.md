# Missing Number (TUF, Leetcode) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/missing-number/submissions/1897979806/)

## Problem Statement
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array.*

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation:
`n = 3` since there are 3 numbers, so all numbers are in the range `[0,3]`. 2 is the missing number in the range since it does not appear in `nums`.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation:
`n = 2` since there are 2 numbers, so all numbers are in the range `[0,2]`. 2 is the missing number in the range since it does not appear in `nums`.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation:
`n = 9` since there are 9 numbers, so all numbers are in the range `[0,9]`. 8 is the missing number in the range since it does not appear in `nums`.

## Understanding 💡
basically, getting the number that is missing from an array, but array can be sorted or unsorted. in case of sorted it's very simple, but in case of unsorted it may become a little tricky to get the number in a optimal way.

## Approach 🚀
**Brute Force : **for a given range, search for each number in the array using linear search.
**Better :**
Use a hashmap, with all the values as 0, and for each element in array, change the value to 1 for the key. and at the end, get the key with value 0.
**Optimal way :**
**1. total sum way :** get the sum of all the numbers in the range and get the sum of all the numbers in the array. return the difference of these two sum.
**2. xor operation :** get the xor of all the numbers  in the range and get the xor of all the numbers in the array. return the xor of both of these xor.

## Code 🖥️

### Python
```python

from typing import List
def missing_number(nums: List[int]) -> int:
    n = len(nums)  # the range will be the size of the list.
    # print("Length of list : ", n)
    # ex : (0,9)

    # need to get the missing number
    """
    brute force solution - using linear search
    """
    # for i in range(n + 1):
    #     # print(">>>>>>>>>>>>>i :",i)
    #     num_exists = False
    #     for j in nums:
    #         # print("j :",j)
    #         if i == j:
    #             num_exists = True
    #             # print(f"entering the condition i={i} for j={j}")
    #
    #     if not num_exists:
    #         return i

    """
    better solution - using hashmap
    """
    # hash_mp = {i : 0 for i in range(n+1)}
    # print("initial value of hash :", hash_mp)
    #
    # for i in nums:
    #     hash_mp[i] = 1
    #
    # print("updated value of hash :", hash_mp)
    #
    # for key,value in hash_mp.items():
    #     if value == 0:
    #         return key

    """
    optimal solution - using sums
    """
    # range_sum = int((n*(n+1))/2)
    # print("range_sum : ", range_sum)
    #
    # list_sum = sum(nums)
    # print("list_sum : ", list_sum)
    #
    # return range_sum - list_sum

    """
    optimal solution - using xor
    """
    range_xor = 0
    list_xor = 0
    for i in range(n):
        list_xor^=nums[i]
        range_xor^=(i+1)

    # print("list_xor :", list_xor)
    # print("range_xor : ", range_xor)

    return range_xor^list_xor

    return None


nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
# nums = [0, 1]

print(missing_number(nums))
```

## Complexity Analysis ⏳
**Brute Force :**
T(n) = O(n^2)
S(n) = O(1)

**Better Way :**
T(n) = O(n)
S(n) = O(n)

**Optimal Approach :**
T(n) = O(n)
S(n) = O(1)

## Edge Cases 🔍
- ✔️ no edge case.
