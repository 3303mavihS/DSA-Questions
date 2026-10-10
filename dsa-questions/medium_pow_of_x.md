# Pow(x, n) (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/powx-n/description/)

## Problem Statement
mplement pow(x, n), which calculates `x` raised to the power `n` (i.e., `x^n`).
Example 1:
```
Input: x = 2.00000, n = 10
Output: 1024.00000
```
Example 2:
```
Input: x = 2.10000, n = 3
Output: 9.26100
```
Example 3:
```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
```
Constraints:
- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31-1`
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- `-10^4 <= x^n <= 10^4`

## Understanding 💡
we need to return the power of the x by n. here n can be positive or negative.

## Approach 🚀
We can solve this using a recursive approach. If `n` is negative, we calculate the power using its positive value and then return `1 / xⁿ`, based on the mathematical rule \(x^{-n} = \frac{1}{x^n}\).
The value of `x` can be an integer or a floating-point number, so we use the `float` data type for `x` and the return value. The exponent `n` can also be very large.
In the basic recursive approach, we multiply `x` by itself and decrease `n` by 1 in every recursive call. This results in O(n) time complexity and can create a very deep recursive stack, exceeding Python's recursion limit for large exponents.
To solve this, we use the half-exponent approach (binary exponentiation). Instead of decreasing `n` by 1, we divide it by 2 in each recursive call.
- If `n == 0`, return `1` (base case).
- Calculate `half = x^(n // 2)` recursively.
- If `n` is even, return `half * half`.
- If `n` is odd, return `x * half * half`, because one extra `x` is needed to account for the odd exponent.
- If `n` is negative, calculate the power using `-n` and return its reciprocal.
This reduces the time complexity from O(n) to O(log n) and the recursive stack space from O(n) to O(log n).

## Code 🖥️

### Python
```python
class Solution:
    def calPow(self, x:float, n:int) -> float:
        if n == 0:
            return 1
        
        half = self.calPow(x, n // 2)

        if n % 2 == 0:
            return half * half

        return x * half * half

    def myPow(self, x: float, n: int) -> float:
        if n < 0:
            n = n * -1
            return 1/self.calPow(x,n)
        
        return self.calPow(x,n)
```

## Complexity Analysis ⏳
Time Complexity : log(n)Space Complexity :  0(1)

## Edge Cases 🔍
- ✔️ make sure handle the large n value buy using the half n approach.