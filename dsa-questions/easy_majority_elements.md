# Majority Elements (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/majority-element/description/)

## Problem Statement
Given an array `nums` of size `n`, return *the majority element*.
The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.
Example 1:
```
Input: nums = [3,2,3]
Output: 3
```
Example 2:
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

## Understanding 💡
From an array, an element that appears more than n/2 times will be considered majority elements. So we need to find an element that is in majority.

## Approach 🚀
**Brute Force :**
- Iterate through the array to select each element one by one.
- For each selected element, run another loop to count its occurrences in the given array.
- If the occurrence of any element is greater than the floor of `(N/2)`, return that element immediately as the majority element.

**Better Approach :**
- Use a hashmap to store elements as `(key, value)` pairs, where the key is the element of the array and the value is the number of times it occurs.
- Traverse the array and update the value of the corresponding key in the hashmap.
- Simultaneously check if the value (the count) of any key is greater than the floor of `(N/2)`.
- If the value is greater than the floor of `(N/2)`, return the key immediately as the majority element.
- If no majority element is found, continue iterating through the array.

**Optimal Approach :**
- using moore's voting algorithm
- we maintain a count and a candidate variable
- we iterate through the array and update the count and candidate variable
- if count is 0 we update the candidate variable to the current element and set count to 1
- if the current element is equal to the candidate variable we increment the count variable
- if the current element is not equal to the candidate variable we decrement the count variable
- at the end of the iteration we return the candidate variable
- we need to check if the candidate variable is majority or not by counting its appearance in the arra
- if the count of the candidate variable is greater than n/2 we return the candidate variable else we return -1

## Code 🖥️

### Python
```python
from typing import List


def majorityElement(nums: List[int]) -> int:
    # n = len(nums)
    # print(n)
    """
    brute force
    # for each element we count the no. of appearance
    # and check if its greater than n/2 or not
    # won't work for large n
    """
    # for i in range(n):
    #     count = 0
    #     for j in range(n):
    #         if nums[i] == nums[j]:
    #             count+=1
    #
    #     if count > n/2:
    #         # print("count :", count)
    #         return nums[i]
    #
    # return -1

    """
    better approach
    # using hashmap
    # store the count for the unique elements in map
    # get the larget count and check it's majority
    """
    # hash_mp = {}
    #
    # for num in nums:
    #     if num in hash_mp:
    #         hash_mp[num]+=1
    #     else:
    #         hash_mp[num]=1
    #
    # # print(hash_mp)
    #
    # for key,value in hash_mp.items():
    #     if value > n // 2:
    #         return key

    """
    optimal approach
    # using moore's voting algorithm
    # we maintain a count and a candidate variable
    # we iterate through the array and update the count and candidate variable
    # if count is 0 we update the candidate variable to the current element and set count to 1
    # if the current element is equal to the candidate variable we increment the count variable
    # if the current element is not equal to the candidate variable we decrement the count variable
    # at the end of the iteration we return the candidate variable
    # we need to check if the candidate variable is majority or not by counting its appearance in the array
    # if the count of the candidate variable is greater than n/2 we return the candidate variable else we return -1
    # time complexity is O(n) and space complexity is O(1)
    """
    # ele = nums[0]
    # count = 0
    # i = 0
    # while i < n:
    #     if count == 0:
    #         ele = nums[i]
    #         count = 1
    #     elif ele == nums[i]:
    #         count+=1
    #     else:
    #         count-=1
    #     i+=1
    #
    # # print(ele, count)
    #
    # ele_count = 0
    # for num in nums:
    #     if num == ele:
    #         ele_count+=1
    #
    #     if ele_count > n // 2:
    #         return num

    # return -1


nums = [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5]

print(majorityElement(nums))
```

## Complexity Analysis ⏳
**Brute Force :**- Time Complexity: O(N^2), where N is the size of the input array. This is because we are using a nested loop to count the occurrences of each element.
- Space Complexity: O(1), as we are using a constant amount of space for the counters and indices.

**Better Approach :**
- Time Complexity: O(N), where N is the size of the input array. This is because we are iterating through the array once to count occurrences and then iterating through the hashmap to find the majority element.
- Space Complexity: O(N), as we are using a hashmap to store the counts of each element, which can take up to N space in the worst case.

**Optimal Approach :**
- Time Complexity: O(N), where N is the size of the input array. This is because we are iterating through the array once to find the potential majority element and then again to verify it.
- Space Complexity: O(1), as we are using only a constant amount of extra space.****

## Edge Cases 🔍
- ✔️ If the input array length is very large
- ✔️ brute force may not work.
