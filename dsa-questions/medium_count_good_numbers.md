# Count Good Numbers (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/count-good-numbers/description/)

## Problem Statement
A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (`2`, `3`, `5`, or `7`).
- For example, `"2582"` is good because the digits (`2` and `8`) at even positions are even and the digits (`5` and `2`) at odd positions are prime. However, `"3245"` is not good because `3` is at an even index but is not even.
Given an integer `n`, return *the total number of good digit strings of length *`n`. Since the answer may be large, return it modulo `10^9 + 7`.
A digit string is a string consisting of digits `0` through `9` that may contain leading zeros.
Example 1:
```
Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".
```
Example 2:
```
Input: n = 4
Output: 400
```
Example 3:
```
Input: n = 50
Output: 564908303
```
Constraints:
- `1 <= n <= 10^15`

## Understanding 💡
given the length of a number. we need to find no. of good numbers.

## Approach 🚀
first of we don't need to check each and every no. if its a good number or not. we go and make some observation. we figure out that every odd position can have only 4 type of number and even position can have 5 type of number. 5c1 and 4c1. so now we can multiply the 5 and 4s and answer the modulus value of it. divisor will be 10^9+7. this helps get the value without overflowing the int limit.

## Code 🖥️

### Python
```python
class Solution:
    def countGoodNumbers(self, n: int) -> int:

        modulo = 1000000007
        even_positions = (n + 1) // 2
        odd_positions = n // 2

        return (pow(5, even_positions, modulo) *
                pow(4, odd_positions, modulo)) % modulo

```

## Complexity Analysis ⏳
Time: O(log n)
Auxiliary space: O(1)

## Edge Cases 🔍
- ✔️ Do not forget of large n value. make sure we use the module to avoid the overflowing.