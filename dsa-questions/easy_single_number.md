# Single Number (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/single-number/)

## Problem Statement
Given a non-empty array of integers `nums`, every element appears *twice* except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

## Understanding 💡
Return the number that has not been repeated in an array. array can have negative numbers. and the numbers will be pair.

## Approach 🚀
**Brute Force :** For every element present in the array, we will do a linear search and count the occurrence. If for any element, the occurrence is 1, we will return it.
**Better way :** In the previous approach, we were finding the occurrence of an element using linear search. We can optimize this using hashing technique. We can simply hash the elements along with their occurrences in the form of (key, value) pair. Thus, we can reduce the cost of finding the occurrence and hence the time complexity. Now, hashing can be done in two different ways and they are the following:
- Array hashing(not applicable if the array contains negatives or very large numbers)
- Hashing using the map data structure

**Optimal Approach :** We will just perform the XOR of all elements of the array using a loop and the final XOR will be the answer.

## Code 🖥️

### Python
```python
from typing import List

def appear_once(nums: List[int]) -> int:

    """
    brute force way
    # keep a count for each element.
    # if count is 1 then return
    """
    # for i in nums:
    #     count = 0
    #     for j in nums:
    #         if i == j:
    #             count+=1
    #
    #     if count == 1:
    #         return i

    """
    better way
    # using hashmap
    # keep count for each element.
    # can't be used in case of array having negative numbers
    """
    # max_i = max(nums)
    #
    # hash_arr = [0] * (max_i + 1)
    #
    # for i in nums:
    #     hash_arr[i]+=1
    #
    # for i in nums:
    #     if hash_arr[i] == 1:
    #         return i

    """
    optimal approach
    # using xor
    """

    # xor = 0
    # for i in nums:
    #     xor^=i
    #
    # return xor

    return -1

nums = [3,4,4,1,2,1,2]
print(appear_once(nums))
```

## Complexity Analysis ⏳
**Brute Force :**
Time Complexity: O(N*N), since nested for loops are used
Space Complexity: O(1). No extra space used

**Better Approach :**
Time Complexity: O(N)+O(N)+O(N), where N = size of the array. One O(N) is for finding the maximum, the second one is to hash the elements and the third one is to search the single element in the array.
Space Complexity: O(maxElement+1) where maxElement = the maximum element of the array.

**Optimal Approach  :**
Time Complexity: O(N). Where N is the size of the array
Space Complexity: O(1). No extra space used

## Edge Cases 🔍
- ✔️ Using correct approach in case of negative number.
