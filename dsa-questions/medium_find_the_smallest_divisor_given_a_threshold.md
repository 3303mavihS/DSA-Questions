# Find the Smallest Divisor Given a Threshold (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/)

## Problem Statement
Given an array of integers `nums` and an integer `threshold`, we will choose a positive integer `divisor`, divide all the array by it, and sum the division's result. Find the smallest `divisor` such that the result mentioned above is less than or equal to `threshold`.
Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: `7/3 = 3` and `10/2 = 5`).
The test cases are generated so that there will be an answer.
Example 1:
```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
```
Example 2:
```
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
```
Constraints:
- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^6`
- `nums.length <= threshold <= 10^6`

## Understanding 💡
return the minimum no that can get the same value as threshold value when the elements in the nums is divided and the ceil value are added.

## Approach 🚀
- First, check if the number of elements is already greater than the allowed limit. If so, no answer is possible, so return -1.
- Then, identify the largest number in the list.
- Start with two markers , one at the smallest possible number (1), and another at the largest number in the list.
- Use a loop to narrow down the range. In each step, find the number that is in the middle of the current range.
- Check if using this middle number as a divisor results in a total that is within the allowed limit. This is done using a helper that adds up the rounded-up results of each division.
- If the result is within the allowed limit, it means this number might work, but a smaller one could be better. So, look in the lower half of the current range.
- If the result is too large, it means this number is too small. So, look in the upper half of the range instead.
- Repeat this process until the range closes. The smallest number that works will be pointed to by the left marker, and that's the answer.

## Code 🖥️

### Python
```python
from typing import List

def ceilValue(dividend, divisor):

    if dividend % divisor != 0:
        return (dividend // divisor) + 1

    return dividend // divisor

def calculateThreshold(nums, value):
    threshold = 0

    for num in nums:
        threshold += ceilValue(num, value)

    return threshold

def smallestDivisor(nums: List[int], threshold: int) -> int:
    """
    getting the range by the observation
    the max  an array can have is some of all the elements
    and the least as the number of elements in the array
    and the answer lies between this range only

    we will be needing a function to calculate the threshold for each no.
    and the we only take the ceil value while dividing two numbers
    """


    """
    Brute Force Approach
    since we figured out the range where the ans can lie. i.e, 1 -> max(nums)
    we can loop through this range and for each element
    we calculate the threshold. and return once found.
    """

    """
    Optimal Approach 
    we use binary search and scrap the extra unwanted search area.
    """

    low = 1
    high = max(nums)

    while low <= high:

        mid = low + (high - low) // 2

        if calculateThreshold(nums, mid) <= threshold:
            high = mid - 1
        else:
            low = mid + 1

    return low



nums = [1,2,5,9]
threshold = 6
# ans = 5

# nums = [44,22,33,11,1]
# threshold = 5

print(smallestDivisor(nums, threshold))
```

## Complexity Analysis ⏳
Time Complexity:O(log(max(arr[]))*N), where max(arr[]) = maximum element in the array, N = size of the array. We are applying binary search on our answers that are in the range of [1, max(arr[])]. For every possible divisor ‘mid’, we call the sumByD() function. Inside that function, we are traversing the entire array, which results in O(N).
Space Complexity: O(1), no extra space is used.
