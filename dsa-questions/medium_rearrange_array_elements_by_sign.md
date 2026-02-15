# Rearrange Array Elements By Sign (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/rearrange-array-elements-by-sign/description/)

## Problem Statement
You are given a 0-indexed integer array `nums` of even length consisting of an equal number of positive and negative integers.
You should return the array of nums such that the array follows the given conditions:
1. Every consecutive pair of integers have opposite signs.
2. For all integers with the same sign, the order in which they were present in `nums` is preserved.
3. The rearranged array begins with a positive integer.
Return *the modified array after rearranging the elements to satisfy the aforementioned conditions*.

**Example 1 :**
```
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation:
The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.
```
**Example 2 :**
```
Input: nums = [-1,1]
Output: [1,-1]
Explanation:
1 is the only positive integer and -1 the only negative integer in nums.
So nums is rearranged to [1,-1].
```

## Understanding 💡
Need to rearrange the positive and negative elements from the array and return them. this type of the question can have two variant.
1. the positive and negative elements are in equal numbers.
2. either the positive numbers are more than negative numbers or vice-versa.

## Approach 🚀
**Type 1 question :**

**Brute Force :** make two separate array with size n/2 and push positive and negative numbers separately. and push them back in the original array at appropriate position. positive numbers at 2*i and negative numbers at 2*i+1.

**Optimal Approach :** Instead of separating them, as we know which place the positive and negative elements are gonna be. we can just pick the element and put them at the correct element in the new array.

**Type 2 question :**

**Brute/Optimal Approach :** Using brute force approach from the type 1 question. we can always the enough elements back to the original array. and push the rest of the elements back from the pos/neg array.

## Code 🖥️

### Python
```python
from typing import List

def rearrangeArray(nums: List[int]) -> List[int]:

    # print(nums)
    # n = len(nums)

    """
    Brute Force (question type 1)
    # positive and negative numbers have same size.
    # separate the positive and negative numbers from the array
    # and push them in arranged order back to the array.
    # positive elements at 2*i pos
    # negative elements at 2*i+1 pos
    """
    # pos = []
    # neg = []
    #
    # for i in range(n):
    #     if nums[i] > 0:
    #         pos.append(nums[i])
    #     else:
    #         neg.append(nums[i])
    #
    # print(pos)
    # print(neg)
    #
    # for i in range(int(n/2)):
    #     nums[2*i]=pos[i]
    #     nums[2*i+1]=neg[i]
    #
    # return nums


    """
    Optimal Approach (question type 2)
    # instead of separating the positive and negative numbers
    # just pick the element and place it at it's correct position in new array
    # pos ele at 2*i
    # neg ele at 2*i+1
    """
    # output_nums = [0]*n
    # pos = 0
    # neg = 1
    # for num in nums:
    #     if num > 0:
    #         output_nums[pos] = num
    #         pos+=2
    #     else:
    #         output_nums[neg] = num
    #         neg+=2
    #
    # return output_nums


    """
    Brute/Optimal Approach (question type 1)
    # the no. of positive and negative numbers are not equal
    # either positive numbers are more than negative numbers or vice-versa
    # separate the pos and neg no. and push them as long we can
    # and push the remaining.
    """
    # pos = []
    # neg = []
    #
    # for i in range(n):
    #     if nums[i] > 0:
    #         pos.append(nums[i])
    #     else:
    #         neg.append(nums[i])
    #
    # for i in range(min(len(pos), len(neg))):
    #     nums[2*i]=pos[i]
    #     nums[2*i+1]=neg[i]
    #
    # idx = min(len(pos), len(neg))
    #
    # for i in range(2*idx, n):
    #     if len(pos)>len(neg):
    #         nums[i]=pos[idx]
    #
    #     if len(neg)>len(pos):
    #         nums[i]=neg[idx]
    #
    #     idx+=1
    #
    # return nums


# nums = [3,1,-2,-5,2,-4]
# print(rearrangeArray(nums))

unequal_nums = [3,1,-2,-5,2,-4,-6,-3,-1,-4,2]
# expected unequal_nums= [3,-2,1,-5,2,-4,2,-6,-3,-1,-4]
print(rearrangeArray(unequal_nums))


```

## Complexity Analysis ⏳
**Type 1 :**

**Brute :**
-T(n) : O(n) + O(n/2)
-S(n) : O(n)
**Optimal :**
-T(n) : O(n)
-S(n) : O(n)

**Type 2 :**

**Brute/Optimal :**
-T(n) : O(n)
-S(n) : O(n)

## Edge Cases 🔍
- No edge case
