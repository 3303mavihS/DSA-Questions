# Add Two Linked List (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/add-two-numbers/description/)

## Problem Statement
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Example 1:
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```
Example 2:
```
Input: l1 = [0], l2 = [0]
Output: [0]
```
Example 3:
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```
Constraints:
- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

## Understanding 💡
need to add two parallel node value of two different length linked lists. and set the values to answer linked list.

## Approach 🚀
iterating from head and adding them with correctly handling the cases.

## Code 🖥️

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
        """
        here we have to create one more linked list to store the answer
        the second things is different cases to take care.
        it's not defined that both linked list will have same no. of node
        that means case 1 : len(l1) > len(l2)
        case 2 : len(l1) < len(l2)
        case 3 : len(l1) = len(l2)
        addition scenario
        1. val(l1n1)+val(l2n1) = 10 (carry 1 to next node)
        2. val(l1n1)+val(l2n1) > 10 (carry the left most value)
        3. val(l1n1)+val(l2n1) < 10 (normal addition)

        we can use the merging two arrays pattern here
        """

        # pointer for both linked list
        l1_cur_node = l1
        l2_cur_node = l2

        ans_list = ListNode()
        ans_list_itr = ans_list

        carry = 0

        # this loop will only cover till node before tail node of
        # shorter linked list
        while l1_cur_node is not None or l2_cur_node is not None or carry:
            val1 = l1_cur_node.val if l1_cur_node else 0
            val2 = l2_cur_node.val if l2_cur_node else 0

            sum_value = val1 + val2 + carry

            ans_list_itr.next = ListNode(sum_value % 10)
            carry = sum_value // 10

            ans_list_itr = ans_list_itr.next

            if l1_cur_node:
                l1_cur_node = l1_cur_node.next

            if l2_cur_node:
                l2_cur_node = l2_cur_node.next

        return ans_list.next
        

```

## Complexity Analysis ⏳
- Time complexity = O(max(len(l1), len(l2))
- space complexity = O(max(len(l1), len(l2))

