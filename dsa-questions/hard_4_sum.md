# 4 sum (TUF, Leetcode) 🔴

**Difficulty:** Hard

[Problem Link](https://leetcode.com/problems/4sum/description/)

## Problem Statement
Given an array `nums` of `n` integers, return *an array of all the unique quadruplets* `[nums[a], nums[b], nums[c], nums[d]]` such that:
- `0 <= a, b, c, d < n`
- `a`, `b`, `c`, and `d` are distinct.
- `nums[a] + nums[b] + nums[c] + nums[d] == target`
You may return the answer in any order.
Example 1:
```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```
Example 2:
```
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

## Understanding 💡
we need to find combinations [list] of four elements which have the sum of 0 or given a target value. so much so that three number can be unique. the order of those elements can be any in the list itself.

## Approach 🚀
**Brute :**

- Create a set to keep only unique groups of four numbers.
- Use the first loop from the start of the array to the end to choose the first number.
- Inside it, run a second loop starting from the next position to choose the second number.
- Then, run a third loop starting from the next position after the second number to choose the third number.
- Finally, run a fourth loop starting from the next position after the third number to choose the fourth number.
- Check if the total of these four numbers equals the target value.
- If yes, arrange the four numbers in order and add them to the set.
- Once all loops are done, return the set as a list of unique groups of four numbers.

**Better :**

- Create a set to keep only unique groups of four numbers.
- Run the first loop from the start to the end of the array to pick the first number.
- Inside it, run the second loop from the next position to pick the second number.
- Before starting the third loop, make a HashSet to keep track of numbers between the second and third positions.
- Run the third loop from the next position after the second number to the end of the array to pick the third number.
- Find the fourth number by subtracting the total of the first three numbers from the target value.
- If this fourth number is already in the HashSet, arrange all four numbers in order and add them to the set.
- Add the current third number to the HashSet (only numbers between the second and third loops are stored).
- After all loops finish, return the set as a list of unique groups of four numbers.

**Optimal :**

- Sort the array first.
- Use the first loop to pick the first number. Skip it if it is the same as the previous one to avoid duplicates.
- Inside it, use the second loop to pick the second number. Also skip it if it repeats the previous one.
- Set two pointers: one just after the second number (left pointer) and one at the end of the array (right pointer).
- While the left pointer is before the right pointer, calculate the total of the four chosen numbers.
- If the total equals the target, save the quadruplet, then move both pointers while skipping duplicate numbers.
- If the total is less than the target, move the left pointer one step forward to increase the total.
- If the total is greater than the target, move the right pointer one step backward to reduce the total.
- After all loops finish, return the list of unique groups of four numbers.

## Code 🖥️

### Python
```python
from typing import List

def three_sum(nums:List[int], target: int) -> List[List[int]]:
    """
    return an array of all the unique quadruplets
    [nums[a], nums[b], nums[c], nums[d]] such that:
    0 <= a, b, c, d < n
    a, b, c, and d are distinct.
    nums[a] + nums[b] + nums[c] + nums[d] == target
    """
    n = len(nums)

    """
    Brute Force
    # take a,b,c,d and get the combination 
    # whenever matches the condition add it to set of list.
    """
    # ans_set = set()
    #
    # for a in range(n):
    #     for b in range(a+1, n):
    #         for c in range(b+1, n):
    #             for d in range(c + 1, n):
    #                 if nums[a]+nums[b]+nums[c]+nums[d]==target:
    #                     temp_list = []
    #                     temp_list.extend([nums[a],nums[b],nums[c],nums[d]])
    #                     temp_list.sort()
    #                     ans_set.add(tuple(temp_list))
    #                     # print(f"nums[a] : {nums[a]}, nums[b] : {nums[b]}, nums[c] : {nums[c]}, nums[d] : {nums[d]}")
    #
    # ans_list = list(ans_set)

    """
    Better Approach
    # take a,b,c fixed and search for the rest. i.e; d
    # nums[a] + nums[b] + nums[c] + nums[d] == target
    # nums[d] == target - (nums[a] + nums[b] + nums[c])
    """
    # ans_set = set()
    #
    # for a in range(n):
    #     for b in range(a+1, n):
    #         hash_set = set()
    #         for c in range(b+1, n):
    #             fourth = target - (nums[a] + nums[b] + nums[c])
    #             if fourth in hash_set:
    #                 temp_list = []
    #                 temp_list.extend([nums[a], nums[b], nums[c], fourth])
    #                 temp_list.sort()
    #                 ans_set.add(tuple(temp_list))
    #
    #
    #             hash_set.add(nums[c])
    #
    # ans_list = list(ans_set)

    """
    Optimal Approach
    # taking a,b fixed and moving c and d as pointer
    # the a!=b!=c!=d (index)
    # skip the same values for them as before
    # sort the nums first
    """

    nums.sort()
    ans_list = []

    for a in range(n):
        if a > 0 and nums[a] == nums[a - 1]: continue

        for b in range(a + 1, n):
            if b > a + 1 and nums[b] == nums[b - 1]: continue

            c = b + 1
            d = n - 1

            while c < d:
                total = nums[a] + nums[b] + nums[c] + nums[d]

                if total == target:
                    ans_list.append([nums[a], nums[b], nums[c], nums[d]])

                    while c < d and nums[c] == nums[c + 1]:
                        c += 1
                    while c < d and nums[d] == nums[d - 1]:
                        d -= 1

                    c += 1
                    d -= 1

                elif total < target:
                    c += 1
                else:
                    d -= 1
    return ans_list

# def fourSum(arr, target):
#     n = len(arr)
#     arr.sort()
#     ans = []
#
#     for i in range(n):
#         if i > 0 and arr[i] == arr[i - 1]:
#             continue
#
#         for j in range(i + 1, n):
#             if j > i + 1 and arr[j] == arr[j - 1]:
#                 continue
#
#             left, right = j + 1, n - 1
#             while left < right:
#                 total = arr[i] + arr[j] + arr[left] + arr[right]
#
#                 if total == target:
#                     ans.append([arr[i], arr[j], arr[left], arr[right]])
#
#                     while left < right and arr[left] == arr[left + 1]:
#                         left += 1
#                     while left < right and arr[right] == arr[right - 1]:
#                         right -= 1
#
#                     left += 1
#                     right -= 1
#                 elif total < target:
#                     left += 1
#                 else:
#                     right -= 1
#     return ans


# nums = [-1,0,1,2,-1,-4]
# nums = [1,0,-1,0,-2,2]
# target = 0

nums = [2,2,2,2,2]
target = 8
print(three_sum(nums, target))
# print(fourSum(nums,target))
```

## Complexity Analysis ⏳
**Brute :**

- Time Complexity: O(N3 * log(no. of unique triplets)), where N = size of the array.
Reason: Here, we are mainly using 3 nested loops. And inserting triplets into the set takes O(log(no. of unique triplets)) time complexity. But we are not considering the time complexity of sorting as we are just sorting 3 elements every time.

- Space Complexity: O(2 * no. of the unique triplets) as we are using a set data structure and a list to store the triplets.

**Better :**

- Time Complexity: O(N3*log(M)), as we are mainly using 3 nested loops, and inside the loops there are some operations on the set data structure which take log(M) time complexity.

- Space Complexity: O(2 * no. of the quadruplets)+O(N), as we are using a set data structure and a list to store the quads. This results in the first term. And the second space is taken by the set data structure we are using to store the array elements. At most, the set can contain approximately all the array elements and so the space complexity is O(N).

**Optimal :**

- Time Complexity: O(N3), as Each of the pointers i and j, is running for approximately N times. And both the pointers k and l combined can run for approximately N times including the operation of skipping duplicates. So the total time complexity will be O(N3).

- Space Complexity: O(no. of quadruplets), as This space is only used to store the answer. We are not using any extra space to solve this problem. So, from that perspective, space complexity can be written as O(1).

## Edge Cases 🔍
- ✔️ no such edge cases.