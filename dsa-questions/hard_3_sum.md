# 3 sum (TUF, Leetcode) 🔴

**Difficulty:** Hard

[Problem Link](https://leetcode.com/problems/3sum/description/)

## Problem Statement
Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
Notice that the solution set must not contain duplicate triplets.
Example 1:
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```
Example 2:
```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```
Example 3:
```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

## Understanding 💡
we need to find combinations [list] of three elements which have the sum of 0 or given a target value. so much so that three number can be unique. the order of those elements can be any in the list itself.

## Approach 🚀
**Brute :**

This method is simple. We check every possible group of three numbers using three loops. If their sum equals the target (0), we keep them. Before storing, we sort the triplet so that we only keep unique ones.

The steps are:
1. Use a set because we need only unique triplets.
2. Run the first loop from the start to the end of the array.
3. Inside it, run the second loop from the next position to the end.
4. Then run the third loop from the next position after the second loop to the end.
5. For every three numbers, check if their sum equals 0. If yes, sort the triplet and add it to the set.
6. At the end, return all triplets from the set.

**Better :**

Earlier, we used three loops to find triplets that sum to zero. But now, we aim to do the same using just two loops. To do this, we will calculate the third number needed to complete the triplet instead of looping to find it.
The idea is simple: if we already have two numbers, we can figure out what the third number should be to make the sum zero. Instead of checking all possible third numbers, we just check if this required number is already present using a set, which helps us search quickly.
But we have to be careful. We cannot put all numbers in the set from the beginning. If we do that, we might accidentally use the same number again from the same position, which is not allowed. That’s why we only put numbers into the set after using them in the second loop.
- Start by creating a set to store the final unique triplets.
- Use the first loop to go through each number one by one.
- Before starting the second loop, create another set to help find the third number.
- Now run the second loop, picking another number after the current one from the first loop.
- Check what number is needed to complete the triplet so that the total is zero.
- If this number is already present in the set, it means we found a valid triplet. Sort it and add it to the answer set.
- After checking, add the current number to the set so it can be used in future checks.
- Finally, after both loops finish, return all the triplets collected in the set.

**Optimal :**

This is an improved version of the previous solution. We remove the extra `set` (used for unique triplets) and `HashSet` (used for quick searching).
By sorting the array first, we can:
- Easily skip repeated numbers by checking if the current number is the same as the previous one.
- Ensure all triplets are unique without storing them in a set.
Instead of using a HashSet to find triplets, we use the two-pointer method:
- One pointer moves forward from the left, the other backward from the right.
- We adjust their positions depending on whether the total is greater than, less than, or equal to the target.
Steps for algorithm :
- Sort the array first.
- Fix the first number using a loop from the beginning to the end of the array.
- Skip the number if it is the same as the previous one (to avoid duplicates).
- Use two pointers:  - Left: starts right after the fixed number.
  - Right: starts from the last element of the array.
- While the left pointer is before the right pointer:  - If the total is greater than 0 → move the right pointer one step left.
  - If the total is less than 0 → move the left pointer one step right.
  - If the total equals 0 → store the triplet, then move both pointers while skipping duplicates.

## Code 🖥️

### Python
```python
from typing import List

def three_sum(nums:List[int]) -> List[List[int]]:
    """
    return all the triplets
    [nums[i], nums[j], nums[k]]
    such that i != j, i != k, and j != k,
    and nums[i] + nums[j] + nums[k] == 0
    """
    n = len(nums)

    """
    Brute Force
    # take i, j, k and get the combination 
    # whenever matches the condition add it to set of list.
    """
    # ans_set = set()
    #
    # for i in range(n):
    #     for j in range(i+1, n):
    #         for k in range(j+1, n):
    #             if nums[i]+nums[j]+nums[k]==0:
    #                 temp_list = []
    #                 temp_list.extend([nums[i],nums[j],nums[k]])
    #                 temp_list.sort()
    #                 ans_set.add(tuple(temp_list))
    #                 # print(f"nums[i] : {nums[i]}, nums[j] : {nums[j]}, nums[k] : {nums[k]}")
    #
    # ans_list = list(ans_set)

    """
    Better Approach
    # using hashmap
    # pick the i and j and figure out the k
    # nums[i]+nums[j]+nums[k]=0
    # nums[k] = -(nums[i]+nums[j])
    """
    # ans_set = set()
    #
    # for i in range(n):
    #     hash_set = set()
    #     for j in range(i+1, n):
    #         third = -(nums[i]+nums[j])
    #
    #         if third in hash_set:
    #             # print(f"nums[i] : {nums[i]}, nums[j] : {nums[j]}, nums[k] : {third}")
    #             temp_list = []
    #             temp_list.extend([nums[i],nums[j],third])
    #             temp_list.sort()
    #             ans_set.add(tuple(temp_list))
    #
    #         hash_set.add(nums[j])
    #
    # ans_list = list(ans_set)


    """
    Optimal Approach
    # using two pointer
    # fix i and keep pointer for j and k
    # pointer j at i+1 and pointer k at n-1
    # before all of this sort the array.
    # and skip if the i,j,k value were same as the last one.
    # move j to left and k to right 
    """

    nums.sort()
    ans_list = []
    for i in range(n):
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        j = i + 1
        k = n - 1

        while j<k:
            total = nums[i]+nums[j]+nums[k]
            if total == 0:
                ans_list.append([nums[i],nums[j],nums[k]])
                j+=1
                k-=1

                while j < k and nums[j] == nums[j - 1]:
                    j += 1
                while j < k and nums[k] == nums[k + 1]:
                    k -= 1

            elif total < 0:
                j += 1
            else:
                k -= 1

    return ans_list


nums = [-1,0,1,2,-1,-4]

print(three_sum(nums))

```

## Complexity Analysis ⏳
**Brute :**

- Time Complexity: O(N3 * log(no. of unique triplets)), where N = size of the array.
Reason: Here, we are mainly using 3 nested loops. And inserting triplets into the set takes O(log(no. of unique triplets)) time complexity. But we are not considering the time complexity of sorting as we are just sorting 3 elements every time.

- Space Complexity: O(2 * no. of the unique triplets) as we are using a set data structure and a list to store the triplets.

**Better :**

- Time Complexity: O(N2 * log(no. of unique triplets)),
as we are mainly using 3 nested loops. And inserting triplets into the set takes O(log(no. of unique triplets)) time complexity. But we are not considering the time complexity of sorting as we are just sorting 3 elements every time.
- Space Complexity: O(2 * no. of the unique triplets) + O(N) as we are using a set data structure and a list to store the triplets and extra O(N) for storing the array elements in another set.

**Optimal :**

- Time Complexity: O(NlogN)+O(N2), as The pointer i, is running for approximately N times. And both the pointers j and k combined can run for approximately N times including the operation of skipping duplicates. So the total time complexity will be O(N2).
- Space Complexity: O(no. of quadruplets), *This space is only used to store the answer. We are not using any extra space to solve this problem.* So, from that perspective, space complexity can be written as O(1).

## Edge Cases 🔍
- ✔️ no such edge cases.