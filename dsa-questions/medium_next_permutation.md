# Next Permutation (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/next-permutation/description/)

## Problem Statement
A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
- For example, for `arr = [1,2,3]`, the following are all the permutations of `arr`: `[1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]`.
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).
- For example, the next permutation of `arr = [1,2,3]` is `[1,3,2]`.
- Similarly, the next permutation of `arr = [2,3,1]` is `[3,1,2]`.
- While the next permutation of `arr = [3,2,1]` is `[1,2,3]` because `[3,2,1]` does not have a lexicographical larger rearrangement.
Given an array of integers `nums`, *find the next permutation of* `nums`.
The replacement must be in place and use only constant extra memory.

Example 1:
```
Input: nums = [1,2,3]
Output: [1,3,2]
```
Example 2:
```
Input: nums = [3,2,1]
Output: [1,2,3]
```
Example 3:
```
Input: nums = [1,1,5]
Output: [1,5,1]
```

## Understanding 💡
if an array can have all elements arranged in al possible permuted number and kept as ordered in dictionary. then the array itself will have the some position in that dictionary. and what would be the next permuted version of the array. we need to return that only.

## Approach 🚀
**Brute Force :** a brute force solution of this question will be pretty simple but wouldn't be a very practical. because first we generate all possible permuted version of the array and then we search for the array in that list or wherever we save it. and then we pick the next of it to return. the constraint we will get in using this approach will not be feasible. because generating a permutation of n size array will be n!. and let's say we have n = 100. then possible premutation will be way too large and then searching the array itself will be not be easy.
**Optimal Approach :** so the optimal approach needs to exist.
We want to rearrange the array to form the next greater permutation. If that's not possible (i.e., it's the last permutation), we return the smallest one (i.e., sorted ascendingly).

To find this next permutation with minimal change, we need to find a digit that can be increased slightly to make the number bigger and then rearrange the remaining part to be the smallest possible.- Traverse from the end and find the first index where the current digit is smaller than the next one (this is the "breaking point").
- Then again traverse from the end to find the first digit greater than the breaking point digit and swap them.
- Finally, reverse the part of the array to the right of the breaking point to get the smallest next permutation.
- If no such breaking point exists (entire array is descending), just reverse the whole array.

## Code 🖥️

### Python
```python
from typing import List

def nextPermutation(nums: List[int]) -> None:
    # print(nums)
    n = len(nums)

    """
    Brute Force
    T(n) = O(n!*n)
    S(n) = O(n!)
    """
    # to solve this question in Brute For
    # we need to generate all the possible permutations for the array
    # need to store them in order to search for the current permuted array
    # that means linear search
    # then we pick the next permutation
    # not very suitable in case of large array size.


    """
    Optimal Approach
    # find the longest matching prefix
    # get a break point
    # swap the break point value with it's closest greater value
    # from the array on the right side of the breakpoint
    # then reverse the array after the breakpoint
    """
    idx = -1 #store breakpoint

    # searching for a break point
    # basically we will get a subarray that won't affect until
    # the break point value is not included.
    # that can only happen if the current value is smaller than the next value.
    for i in range(n-2,-1, -1): # range(start,end,step) end will not be included so it will go till 0 and not -1
        if nums[i]<nums[i+1]:
            idx = i
            break

    # print(idx)

    # if we don't find such break point
    # that means the number itself is last permuted number in the permutation list.
    # so we fallback to first permuted number of the list
    # therefore reverse the whole array
    if idx == -1:
        nums.reverse()
        return nums
        # for i in range(int(n/2)):
        #     nums[i],nums[n-1-i] = nums[n-1-i],nums[i]


    # now we need to search for the smallest greater number than breakpoint value
    for i in range(n-1,idx,-1):
        if nums[i]>nums[idx]:
            nums[i],nums[idx]=nums[idx],nums[i]
            break

    # even though we have swapped the values
    # the updated array is still not the next permutation
    # since the subarray is still in an order that is last permuted of itself
    # therefore we reverse them as well
    nums[idx+1:n] = nums[idx+1:n][::-1]


    return nums


nums = [2,1,5,4,3,0,0]
# nums = [5,4,3,0,0]
nums = [3,2,1]

print(nextPermutation(nums))
```

## Complexity Analysis ⏳
**Brute Force :**
- Time Complexity: O(N!*N), since we are generating all possible permutations, it takes N! time.
- Space Complexity: O(N!), storing all permutations.

**Optimal Approach :**
- Time Complexity: O(N), we find the breaking point and reverse the subarray in linear time.
- Space Complexity: O(1), constant additional space is used.

## Edge Cases 🔍
- don't use the brute force because the n could be to big and it won't work
- if the array itself is last permuted value, fallback to the first possible permuted value.
