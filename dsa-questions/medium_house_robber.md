# House Robber | Stickler Thief | Maximum sum such that no two are adjacent (TUF, Leetcode, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1)

## Problem Statement
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.
Example 1:
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```
Example 2:
```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```
Constraints:
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Understanding 💡
Need to find max value that can be attained when we can't choose two adjacent value in an array.

## Approach 🚀
we can use the take, not-take approach for each and every element. recursively we can check for each combination. using dp memoization method and tabular method can help us get the value in O(n) time complexity and O(1) space complexity. check code for every method.

## Code 🖥️

### Python
```python
class Solution:  
    def findMaxSum(self, arr):
        """
        it's similar question as house robber,
        and Maximum Sum of Non-Adjacent Elements
        
        solution is calculating all possible subsequences
        and taking out the max possible subsequence
        so using dp memoization method
        and tabulation method in order to keep O(1) S(n)
        """
        
        
        """
        first we solve it with recurrence
        """
        
        # n = len(arr)
        
        # def calc_sub_sum(arr, idx):
            
        #     if idx == 0:
        #         return arr[idx]
            
        #     if idx < 1:
        #         return 0
            
        #     pick = arr[idx] + calc_sub_sum(arr, idx - 2)
        #     not_pick = 0 + calc_sub_sum(arr, idx - 1)
            
        #     return max(pick, not_pick)
            
        # return calc_sub_sum(arr, n-1)
        
        """
        we add the memoization for dp
        so that it can avoid the calculation of overlapping
        """
        # n = len(arr)
        
        # dp_arr = {}
        
        # def calc_sub_sum(arr, idx, dp_arr):
            
        #     if idx == 0:
        #         return arr[idx]
            
        #     if idx < 1:
        #         return 0
                
        #     if idx in dp_arr:
        #         return dp_arr[idx]
            
        #     pick = arr[idx] + calc_sub_sum(arr, idx - 2, dp_arr)
        #     not_pick = 0 + calc_sub_sum(arr, idx - 1, dp_arr)
            
        #     dp_arr[idx] = max(pick, not_pick)
            
        #     return dp_arr[idx]
            
        # return calc_sub_sum(arr, n-1, dp_arr)
        
        
        """
        now we can use tabular method of dp
        where we can use O(1) space and not use
        dp_arr to store all possible answer.
        """
        ### with dp_arr ###
        # n = len(arr)
        
        # dp_arr = {}
        # dp_arr[0] = 0
        
        # neg = 0
        
        # for i in range(1,n):
        #     take = arr[i]
            
        #     if i>1:
        #         take += dp_arr[i-2]
            
        #     not_take = 0 + dp_arr[i-1]
            
        #     dp_arr[i] = max(take, not_take)
            
            
        # return dp_arr[n-1]
        
        
        ### without dp_arr ###
        
        n = len(arr)
        
        prev = arr[0]
        prev_prev = 0
        
        for i in range(1, n):
            take = arr[i]
            
            if i>1:
                take += prev_prev
            
            not_take = 0 + prev
            
            cur_i = max(take, not_take)
            prev_prev = prev
            prev = cur_i
            
        return prev
        
```

## Complexity Analysis ⏳
Time Complexity : O(n)Space Complexity  O(1)
