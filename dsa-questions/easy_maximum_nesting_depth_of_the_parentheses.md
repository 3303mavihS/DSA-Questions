# Maximum Nesting Depth of the Parentheses (Leetcode, TUF) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses)

## Problem Statement
Given a valid parentheses string `s`, return the nesting depth of* *`s`. The nesting depth is the maximum number of nested parentheses.
Example 1:
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation:
Digit 8 is inside of 3 nested parentheses in the string.
Example 2:
Input: s = "(1)+((2))+(((3)))"
Output: 3
Explanation:
Digit 3 is inside of 3 nested parentheses in the string.
Example 3:
Input: s = "()(())((()()))"
Output: 3
Constraints:
- `1 <= s.length <= 100`
- `s` consists of digits `0-9` and characters `'+'`, `'-'`, `'*'`, `'/'`, `'('`, and `')'`.
- It is guaranteed that parentheses expression `s` is a VPS.

## Understanding 💡
need to return the max depth of a paranthesis.

## Approach 🚀
iterating through the string, and increase the counter for every ( and decrease for every ). also keep a max_depth that hold max value of counter.

## Code 🖥️

### Python
```python
class Solution:
    def maxDepth(self, s: str) -> int:
        # iterate through each and increase the count
        # also keep the max count
        # return the max the count
        cnt = 0
        max_cnt = 0

        for c in s:

            if c == "(":
                cnt += 1
                max_cnt = max(max_cnt, cnt)
            elif c == ")":
                cnt -= 1
            else:
                continue

        return max_cnt
```

## Complexity Analysis ⏳
- Time complexity : O(n)
- Space complexity : O(1)
