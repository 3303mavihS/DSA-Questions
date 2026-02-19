# Leaders in array (TUF, GeekofGeeks) 🟡

**Difficulty :** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1)

## Problem Statement
You are given an array `arr` of positive integers. Your task is to find all the leaders in the array. An element is considered a leader if it is greater than or equal to all elements to its right. The rightmost element is always a leader.

Examples:
```
Input: arr = [16, 17, 4, 3, 5, 2]
Output: [17, 5, 2]
Explanation: Note that there is nothing greater on the right side of 17, 5 and, 2.
```
```
Input: arr = [10, 4, 2, 4, 1]
Output: [10, 4, 4, 1]
Explanation: Note that both of the 4s are in output, as to be a leader an equal element is also allowed on the right. side
```
```
Input: arr = [5, 10, 20, 40]
Output: [40]
Explanation: When an array is sorted in increasing order, only the rightmost element is leader.
```
```
Input: arr = [30, 10, 10, 5]
Output: [30, 10, 10, 5]
Explanation: When an array is sorted in non-increasing order, all elements are leaders.
```

## Understanding 💡
need to find the value which is greater than all the elements on its right side. We can return the values in an array but order of the output can be in sorted order or in the order that the array has it.

## Approach 🚀
**Brute :**
- In this brute force approach, we start by checking all the elements from the start of the array to the end to determine if an element is greater than all the elements to its right (i.e., the leader).
- We use nested loops for this:- The outer loop checks each element in the array to see if it is a leader.
- The inner loop checks if there is any element to the right that is greater than the element being currently processed by the outer loop.
- Begin by initializing the outer loop pointer at the start element and set it as the current leader.
- If any element traversed is found to be greater than the current leader, the element is not considered a leader, and the outer loop pointer is incremented by 1, setting the next element as the current leader.
- If no other element to the right is greater than the current element, it is added to the answer array as a leader element.

**Optimal :**
- Set a variable `max` to the last element of the array (`nums[sizeOfArray - 1]`), as the last element is always a leader.
- Create an empty list `ans` to store the leader elements, and initially add the last element of the array to this list, as it is always a leader.
- Start from the second last element (index = `sizeOfArray - 2`) and move towards the first element (index = 0).
- For each element, compare it with the `max` variable. If the current element is greater than `max`, add this element to the `ans` list and update `max` to the current element.
- After processing all elements, the `ans` list will contain all the leader elements in reverse order. Reverse the `ans` list and return it.

## Code 🖥️

### Python
```python
from typing import List

def leaders(nums: List[int]) -> List:

    n = len(nums)
    leader_array = []

    """
    Brute Force
    # we iterate the array and for each element 
    # we check of there is any greater element exist
    # if none found, we take it as leader
    """
    # for i in range(n):
    #     leader = True
    #     for j in range(i+1, n):
    #         if nums[j] > nums[i]:
    #             leader = False
    #             break;
    #
    #     if leader:
    #         leader_array.append(nums[i])
    #
    # return leader_array


    """
    Optimal Approach
    # we iterate the array from the right.
    # keep a max value INT_MIN
    # and compare each element with max value.
    # update the max value if found.
    # if not found then push to leader_array
    # sort or reverse the array in according to the format
    """
    # MAX_VAL = float('-inf')
    # 
    # for i in range(n-1,-1,-1):
    #     # print(nums[i])
    # 
    #     if nums[i] >= MAX_VAL:
    #         leader_array.append(nums[i])
    # 
    #     MAX_VAL = max(MAX_VAL, nums[i])
    # 
    # leader_array.reverse()
    # 
    # return leader_array

nums = [16, 17, 4, 3, 5, 2]

print(leaders(nums))
```

## Complexity Analysis ⏳
**Brute Force :**
- Time Complexity: O(N2), where N is the size of the input array. This is because we have a nested loop where the outer loop runs N times and the inner loop runs up to N times in the worst case.
- Space Complexity: O(1), as we are using only a constant amount of extra space for the answer array, which does not depend on the input size.

**Optimal Approach:**
- Time Complexity: O(N), where N is the size of the input array. This is because we traverse the array only once.
- Space Complexity: O(1), as we are using only a constant amount of extra space.

## Edge Cases 🔍
- no such case. avoid using brute force for large n values
