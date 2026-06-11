# Square root using binary search (TUF, GeeksForGeeks) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/square-root/1)

## Problem Statement
Given a positive integer n, find the square root of n. If n is not a perfect square, then return the floor value.
Floor value of any number is the greatest Integer which is less than or equal to that number.
Examples:
```
Input: n = 4
Output: 2
Explanation: Since, 4 is a perfect square, so its square root is 2.
```
```
Input: n = 11
Output: 3
Explanation: Since, 11 is not a perfect square, floor of square root of 11 is 3.
```
```
Input: n = 1
Output: 1
Explanation: 1 is a perfect sqaure, so its square root is 1.
```
Constraints:
`1 ≤ n ≤ 3*10^4`

## Approach 🚀
The naive method tries every number, which is slow when n is large. But our possible answer space (from 1 to n) is sorted, meaning if a certain number squared is less than or equal to n, then all smaller numbers will also work. This allows us to apply Binary Search on the answer space to efficiently find the largest number whose square is less than or equal to n.
- First, note that the answer lies between 1 and the given number n.
- Set the search range with the smallest value as 1 and the largest value as n.
- Use binary search within this range to test possible numbers.
- At each step, take the middle number and check if its square is less than or equal to n.
- If it is, record this number as a candidate and move right to check for a larger number.
- If the square is greater than n, move left to check smaller numbers.
- Continue this process until the range closes, and the largest recorded number will be the square root.

## Code 🖥️

### Python
```python
class Solution:
    def floorSqrt(self, n): 
        # code here
        
        low = 1
        high = n
        
        ans = -1
        
        while low <= high:
            
            mid = low + (high - low) // 2
            
            if mid*mid <= n:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        
        return ans
```

## Complexity Analysis ⏳
- Time Complexity: O(log(N)), we apply binary search on our search space to reduce it into half at every step.
- Space Complexity: O(1), since the algorithm does not use any additional space or data structures.

