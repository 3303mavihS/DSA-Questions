# Remove Outermost Parentheses (Leetcode, TUF) 🟢

**Difficulty:** Easy

[Problem Link](https://leetcode.com/problems/remove-outermost-parentheses/description/)

## Problem Statement
A valid parentheses string is either empty `""`, `"(" + A + ")"`, or `A + B`, where `A` and `B` are valid parentheses strings, and `+` represents string concatenation.
- For example, `""`, `"()"`, `"(())()"`, and `"(()(()))"` are all valid parentheses strings.
A valid parentheses string `s` is primitive if it is nonempty, and there does not exist a way to split it into `s = A + B`, with `A` and `B` nonempty valid parentheses strings.
Given a valid parentheses string `s`, consider its primitive decomposition: `s = P1 + P2 + ... + Pk`, where `Pi` are primitive valid parentheses strings.
Return `s` *after removing the outermost parentheses of every primitive string in the primitive decomposition of *`s`.
Example 1:
```
Input: s = "(()())(())"
Output: "()()()"
Explanation:
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
```
Example 2:
```
Input: s = "(()())(())(()(()))"
Output: "()()()()(())"
Explanation:
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".
```
Example 3:
```
Input: s = "()()"
Output: ""
Explanation:
The input string is "()()", with primitive decomposition "()" + "()".
After removing outer parentheses of each part, this is "" + "" = "".
```
Constraints:
- `1 <= s.length <= 10^5`
- `s[i]` is either `'('` or `')'`.
- `s` is a valid parentheses string.

## Understanding 💡
need to return the string where the every outermost paranthesis are removed from that valid string.

## Approach 🚀
- Initialize an empty result string to store the processed output
- Initialize a counter (level) to track the depth of parentheses
- Traverse through the string character by character:
- If the current character is '(', increment the level counter. If the level is greater than 1 (indicating we're inside a valid primitive), add '(' to the result string
- If the current character is ')', decrement the level counter. If the level is greater than 0 (indicating we're still inside a valid primitive), add ')' to the result string
- After the entire string has been traversed, return the result string

## Code 🖥️

### Python
```python
class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        ans = ""
        counter = 0

        for c in s:
            if c == "(":
                if counter >= 1:
                    ans = ans + c
                counter += 1
            else:
                counter -= 1
                if counter >= 1:
                    ans = ans + c

        return ans
```

## Complexity Analysis ⏳
Time Complexity: O(n), since we are performing a single traversal of the string.
Space Complexity: O(1), since we are using a few variables to track the current state.

