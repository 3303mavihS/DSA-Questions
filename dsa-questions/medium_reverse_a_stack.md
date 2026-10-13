# Reverse a Stack (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/reverse-a-stack/1)

## Problem Statement
You are given a stack st[]. You have to reverse the stack.
Note: The input array represents the stack from bottom to top (last element is the top). The output is displayed by printing elements from top to bottom after reversal.
Examples:
```
Input: st[] = [1, 2, 3, 4]
Output: [1, 2, 3, 4]
Explanation: After reversing, the elements of stack are in opposite order.
```
Input: st[] = [3, 2, 1]
Output: [3, 2, 1]
Explanation: After reversing, the elements of stack are in opposite order.
Constraints:
1 ≤ st.size() ≤ 100
0 ≤ stack element ≤ 100
```
```

## Understanding 💡
need to reverse the stack in itself. because the function is not returning anything.

## Approach 🚀
Approach 1: Use another stack
- Pop each element from `st` and push it onto a second stack.
- The second stack will contain the elements in reverse order.
- If the question requires reversing the original stack in place, you would need to transfer the elements back.
Approach 2: Use an auxiliary array
- Pop elements from `st` into an array.
- Push them back into the now-empty stack in the array's iteration order.
Complexity for both: Time (O(n)), auxiliary space (O(n)).
Approach 3 : The recursive approach uses two functions: one to pop all elements, and another to insert each popped element at the bottom of the stack.

## Code 🖥️

### Python
```python
"""
recursive approach code
"""
def insert_at_bottom(st, x):
    if not st:
        st.append(x)
        return

    top = st.pop()
    insert_at_bottom(st, x)
    st.append(top)


def reverse_stack(st):
    if not st:
        return

    top = st.pop()
    reverse_stack(st)
    insert_at_bottom(st, top)

"""
actual answer linear approach
"""

class Solution:
    def reverseStack(self, st):
        """
        there can be recursive approach for this problem
        but it will time complexity of O(n^2)
        and here we have to have time complexity of O(n)
        and space complexity of O(n)
        """
        
        """
        so better approach will be iterating/popping the stack 
        top element and push either in an array or directly to new
        stack, since this function is not expecting and return value
        that means the same stack is being used to print the reversal.
        """
        
        temp_arr = []

        for ele in st[::-1]:
            temp_arr.append(ele)

        # print(st)
        # print(temp_arr)

        for i in range(len(temp_arr)):
            st[i] = temp_arr[i]

        # print(st)
        

```

## Complexity Analysis ⏳
Time Complexity: O(n)
Auxiliary Space: O(n)
for recursive approach
Time Complexity:O(n^2)

## Edge Cases 🔍
