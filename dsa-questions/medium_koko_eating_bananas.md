# Koko Eating Bananas (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/koko-eating-bananas/description/)

## Problem Statement
Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.
Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return *the minimum integer* `k` *such that she can eat all the bananas within* `h` *hours*.
Example 1:
```
Input: piles = [3,6,7,11], h = 8
Output: 4
```
Example 2:
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```
Example 3:
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```
Constraints:
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Understanding 💡
Need to return no. of banana that koko needs to eat per hour if hour and no. of bananas each pile contains is given.

## Approach 🚀
The naive method checks every speed, which is slow if the piles are large. But the possible answer space (from 1 to the maximum pile size) is sorted, meaning if a certain speed works, then all higher speeds will also work. This allows us to apply Binary Search on the answer space to efficiently find the minimum speed at which Koko can finish the bananas within the given hours.
- First, identify the largest pile size since the eating speed cannot be more than that.
- Set the search range with the lowest speed as 1 and the highest speed as the maximum pile size.
- Use binary search within this range to check possible speeds.
- At each step, take the middle value as the current speed and calculate how many hours it would take to finish all piles at this speed.
- If the total hours are less than or equal to the allowed hours, this speed is a candidate, so try to see if a smaller speed also works by moving left.
- If the total hours exceed the allowed hours, then the speed is too slow, so move right to try higher speeds.
- Continue this process until the range closes, and the smallest valid speed found will be the answer.

## Code 🖥️

### Python
```python
from typing import List

def ceilValue(value, h):
    """
    returns the ceil value for value/h
    """
    if value % h != 0:
        return value // h + 1

    return value // h


def calulateMinHour(h, piles):
    """
    returns the total no. of hours of the pile with given h
    """
    hours = 0

    for ele in piles:
        hours+=ceilValue(ele, h)

    return hours

def minEatingSpeed(piles: List[int], h: int) -> int:

    """
    Return the minimum integer k such that she can eat all the bananas within h hours.
    """

    """
    Brute force says
    starting from 1 till max element of the pile
    we calculate for all the possible outcomes
    and return the correct k which satisfies the 
    h hours
    """

    """
    Optimal Approach says
    we apply the binary search on same range 
    and get to the answer
    instead of calculating for each possible
    """

    left = 1
    ans = right = max(piles)

    while left <= right:

        mid = left + (right - left) // 2
        minHours = calulateMinHour(mid, piles)

        if minHours == h:
            return mid

        if minHours <= h:
            ans = mid
            right = mid - 1
        else:
            left = mid + 1

    return ans


# piles = [3,6,7,11]
# h = 8
# piles = [30,11,23,4,20]
# h = 5
# piles = [30,11,23,4,20]
# h = 6
# piles = [1]
# h = 2
piles = [312884470]
h = 312884469

print(minEatingSpeed(piles, h))


```

## Complexity Analysis ⏳
Time Complexity: O(N*log(max(a[]))), we apply binary search on our search space to reduce it into half at every step.
Space Complexity: O(1), since the algorithm does not use any additional space or data structures.
