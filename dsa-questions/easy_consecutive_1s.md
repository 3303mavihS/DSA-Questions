# Consecutive 1's (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/max-consecutive-ones/description/)

## Problem Statement
Given a binary array `nums`, return *the maximum number of consecutive *`1`*'s in the array*.
Example 1:
```
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
```
Example 2:
```
Input: nums = [1,0,1,1,0,1]
Output: 2
```

## Understanding 💡
Return the max number of consecutive 1's in an array

## Approach 🚀
normal approach, keep counting the 1s and store the count in new variable and return the max_count once you traverse the whole array.

## Code 🖥️

### Python
```python
from typing import List

def findMaxConsecutiveOnes(nums: List[int]) -> int:
    count = 0  # keeps the count of 1's
    max = 0  # keep the max count

    for i in nums:
        if i == 1:
            count += 1
            if max < count:
                max = count
        else:
            count = 0

    return max

# nums = [1,0,1,1,0,1]
# nums = [1,1,0,1,1,1]
nums = [0, 1]

print(findMaxConsecutiveOnes(nums))
```

## Complexity Analysis ⏳
T(n) :  O(n)
S(n) : O(1)

## Edge Cases 🔍
- ✔️ none
