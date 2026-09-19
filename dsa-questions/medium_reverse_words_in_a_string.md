# Reverse Words in a String (Leetcode, TUF) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/reverse-words-in-a-string/description/)

## Problem Statement
Given an input string `s`, reverse the order of the words.
A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.
Return *a string of the words in reverse order concatenated by a single space.*
Note that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.
Example 1:
```
Input: s = "the sky is blue"
Output: "blue is sky the"
```
Example 2:
```
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
```
Example 3:
```
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```
Constraints:
- `1 <= s.length <= 10^4`
- `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.
- There is at least one word in `s`.

## Understanding 💡
Need to reverse the word in a sentence like string. not the words itself but we have to arrange them in reverse order of the sentence. remove extra spaces.

## Approach 🚀
- nitialize an empty result string.
- Set a pointer at the last character of the string.
- While the pointer is within the string:

## Code 🖥️

### Python
```python
class Solution:
    def reverseWords(self, s: str) -> str:

        """
        two pointer approach
        """
        ans = ""
        n = len(s)
        start = end = n

        i = n - 1
        while i >= 0:
            if i == 0 and s[i] != " ":
                ans = ans + s[0:end]

            if s[i] == " ":
                start = i+1

                if s[start:end] != "":
                    ans = ans + s[start:end] + " "

                end = i

            i -= 1

        # making sure any trailing space gets removed
        if ans[len(ans) - 1] == " ":
            return ans[:-1]

        return ans


        """
        solution with python functions
        """
        # words = s.split()
        # words.reverse()
        # return " ".join(words)

```

## Complexity Analysis ⏳
Time Complexity: O(N), We traverse the string once from right to left and construct the result directly without extra passes.
Space Complexity: O(1),Ignoring the output string, no additional data structures proportional to input size are used.

## Edge Cases 🔍
