# Longest consecutive sequence (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/longest-consecutive-sequence/description/)

## Problem Statement
Given an unsorted array of integers `nums`, return *the length of the longest consecutive elements sequence.*
You must write an algorithm that runs in `O(n)` time.

Example 1:
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.
```
Example 2:
```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```
Example 3:
```
Input: nums = [1,0,1,2]
Output: 3
```

## Understanding 💡
Need to find a sequence of consecutive number with longest length in the array. not an subarray but a sequence of consecutive element.

## Approach 🚀
**Brute :**
- As you iterate through each number in the array, begin by checking if consecutive numbers like `(x+1, x+2, x+3)`, and so on, exist in the array. The occurrence of the next consecutive number can be checked by using a linear search.
- When you find consecutive numbers, start counting them using a counter. Increment this counter each time you find the next consecutive number in the sequence.
- This counter effectively keeps track of how long the current consecutive sequence is as you move through the array and find more consecutive numbers.

**Better :**
- Begin by sorting the entire array in ascending order. This step helps group consecutive numbers together, simplifying the sequence detection process.
- Use a loop to iterate through each element of the sorted array.
- Track consecutive sequences by comparing each element `arr[i]` with the `lastSmaller` variable. If `arr[i] - 1 == lastSmaller`, increment the length of the current sequence (`cnt`) and update `lastSmaller` to `arr[i]`.
- Skip the current element if `arr[i]` equals `lastSmaller`, as it's already part of a sequence.
- If `arr[i]` is greater than `lastSmaller + 1`, start a new sequence from `arr[i]` by updating `lastSmaller` to `arr[i]` and reset `cnt` to 1.
- Throughout the iteration, compare `cnt` with `longest` and update `longest` to store the maximum sequence length encountered.
- Note: Here, we are distorting the given array by sorting it.

**Optimal :**
- We will use two variables: `cnt` to store the length of the current sequence and `longest` to store the maximum length found.
- First, place all the array elements into a set data structure to allow efficient lookups for consecutive numbers.
- For each element `x` that can start a sequence (i.e., `x - 1` does not exist in the set), we follow these steps:
- Compare `cnt` with `longest` and update `longest` to hold the maximum value: `longest = max(longest, cnt)`.
- Finally, `longest` will contain the length of the longest consecutive sequence found in the array.

## Code 🖥️

### Python
```python
from typing import List

# def linear_search(value, nums):
#     for num in nums:
#         if value == num:
#             return True
#
#     return False

def longestConsecutive(nums: List[int]) -> int:
    n = len(nums)

    # need to return the longest
    # and in any case the longest will be 1
    longest = 1

    if n == 0:
        return 0
    """
    Brute Force
    # for each element we check if the next consecutive value exists
    # and so on
    # keep the track of the count
    """
    # for i in range(n):
    #     count = 0
    #     j = nums[i]
    #     while linear_search(j,nums):
    #         count+=1
    #         j+=1
    #
    #     longest = max(longest, count)
    #
    # return longest


    """
    Better Approach
    # we sort the whole array.
    # then all the element in consecutive numbers will come together
    # so we check we the next element is consecutive or not.
    # last_smaller will help us to know if the next is consecutive or not
    # keep track of longest
    # also if the next element is not consecutive we start over.
    """
    # nums.sort()
    # # print(nums)
    # last_smaller = float('-inf')
    # count = 0
    # for num in nums:
    #     if last_smaller == num-1:
    #         count += 1
    #         last_smaller = num
    #     elif last_smaller != num:
    #         count = 1
    #         last_smaller = num
    #
    #     longest = max(longest, count)
    # return longest


    """
    Optimal Approach
    # using set, eliminate duplicates
    # for each element, check if the previous consecutive value exist
    # if yes we move to next assuming the element in not the starting of the sequence
    # if not found, we assume it as start and start looking for the next consecutive value.
    # it takes space complexity of O(n) so if the constraint of O(1) comes, the better is optimal
    """
    # unique_set = set()
    # 
    # for num in nums:
    #     unique_set.add(num)
    # 
    # print(unique_set)
    # 
    # for ele in unique_set:
    #     if ele-1 not in unique_set:
    #         count = 1
    # 
    #         x = ele
    #         while x+1 in unique_set:
    #             x+=1
    #             count+=1
    # 
    #         longest = max(longest, count)
    # 
    # return longest


nums = [0,3,7,2,5,8,4,6,0,1]
# nums = [1,0,1,2]

print(longestConsecutive(nums))
```

## Complexity Analysis ⏳
**Brute :**
- Time Complexity: O(n2), where n is the number of elements in the array. This is because for each element, we may need to perform a linear search through the entire array to find consecutive numbers.
- Space Complexity: O(1), as we are using a constant amount of extra space for variables.

**Better :**
- Time Complexity: O(n log n), where n is the number of elements in the array. This is due to the sorting step, which is the most time-consuming operation in this approach.
- Space Complexity: O(1), as we are using only a constant amount of extra space.

**Optimal :**
- Time Complexity: O(n), where n is the number of elements in the array. This is because we traverse each element once to build the set and then again to find the longest consecutive sequence.
- Space Complexity: O(n), as we use a set to store the unique elements of the array, which in the worst case can be equal to the size of the input array.

## Edge Cases 🔍
- ✔️ If the length of the array is 1 then return the longest as 1. also avoid the brute for the large n size.
