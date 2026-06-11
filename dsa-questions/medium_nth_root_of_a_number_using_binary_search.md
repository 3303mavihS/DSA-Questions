# Nth Root of a Number using Binary Search (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1)

## Problem Statement
You are given 2 numbers n and m, the task is to find n√m (nth root of m). If the root is not integer then return -1.
Examples :
```
Input: n = 3, m = 8
Output: 2
Explanation: 23 = 8
```
```
Input: n = 3, m = 9
Output: -1
Explanation: 3rd root of 9 is not integer.
```
```
Input: n = 4, m = 16
Output: 2
Explanation: 24 = 16
```
Constraints:
```
1 ≤ n ≤ 9
0 ≤ m ≤ 20
```


## Approach 🚀
To find the N-th root of a number M, instead of checking every number from 1 to M (which is inefficient), we use binary search to efficiently reduce the search space. Since the N-th root lies between 1 and M, we start with a search range from 1 to M. For each middle value in this range, we compute its N-th power by multiplying it with itself N times, without using built-in power functions (to avoid integer overflow). During this multiplication, if the result exceeds M, we stop early to save time. If the final result equals M, we’ve found the N-th root. Otherwise, we adjust our search range accordingly to continue the binary search. This method significantly speeds up the process by halving the range at each step.
- Start binary search with low as 1 and high as M.
- Find mid of the range and multiply it with itself N times to get Nth power of mid.
- If Nth power of mid equals M, return mid as the N-th root.
- If Nth power of mid is less than M, shift search to the right half.
- If Nth power of mid is greater than M, shift search to the left half.
- If no integer root is found after the loop, return -1.

## Code 🖥️

### Python
```python
class Solution:
    
    def n_multiple(self, n, power):
        value = 1
        for i in range(power):
            value*=n
            
        return value
    
    def nthRoot(self, n, m):
        
        if n == 1:
            return m
        
        if m == 0:
            return 0
        
        low = 1
        high = m
        
        ans = -1
        
        while low <= high:
            
            mid = low + (high - low) // 2
            
            if self.n_multiple(mid, n) == m:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        
        return ans


```

## Complexity Analysis ⏳
- Time Complexity: O(logM), we search for every possible number from 1 to M to check if it is the Nth root.
- Space Complexity: O(1), constant additional space is used.

