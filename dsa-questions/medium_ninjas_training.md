# Ninja's training (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/geeks-training/1)

## Problem Statement
Geek is attending a training program for n days. Each day he must perform exactly one of three activities: Running, Fighting, or Learning. Each activity earns a certain number of merit points, which can differ from day to day.
To improve all his skills, Geek cannot perform the same activity on two consecutive days.
Given a 2D matrix mat[][], where for the i-th day:
- mat[i][0] is the merit points for Running
- mat[i][1] is the merit points for Fighting
- mat[i][2] is the merit points for Learning
Return the maximum total merit points Geek can earn over the n days.
Example:
```
Input: mat[][] = [[8, 7, 1], [9, 2, 1]]
Output: 16
Explanation: Picking the best activity on day 1 (Running, 8) blocks Running on day 2,
so the best he could then get is Fighting (2), giving 10.
Instead, Geek does Fighting on day 1 (7) and Running on day 2 (9), giving 7 + 9 = 16.
```
```
Input: mat[][] = [[2, 5, 3], [6, 4, 1], [3, 7, 2], [4, 4, 9]]
Output: 27
Explanation: One optimal plan is Fighting (5), Running (6), Fighting (7), Learning (9).
No activity repeats on consecutive days, and the total is 5 + 6 + 7 + 9 = 27.
```
```
Input: mat[][]= [[4, 2, 6]]
Output: 6
Explanation: With only one day there is no consecutive-day restriction, so Geek simply picks the best activity, Learning, and earns 6 points.
```
Constraints:
1 ≤ mat.size() ≤ 105
1 ≤ mat[i][j] ≤ 100
mat[i].size() = 3

## Understanding 💡
https://www.youtube.com/watch?v=AE39gJYuRog

## Approach 🚀
using DP

## Code 🖥️

### Python
```python
class Solution:
    
    def actualTraining(self, mat, day, last, dp_arr):
        
        if day == 0:
            maxi = 0
            
            for task in range(len(mat[0])):
                if task != last:
                    maxi = max(maxi, mat[0][task])
            
            return maxi
            
        if day in dp_arr and last in dp_arr[day]:
            return dp_arr[day][last]
            
        
        maxi = 0
        
        for task in range(len(mat[0])):
            if task != last:
                point = mat[day][task] + self.actualTraining(mat, day-1, task, dp_arr)
                maxi = max(maxi, point)
        
        if day not in dp_arr:
            dp_arr[day] = {}

        dp_arr[day][last] = maxi
        
        return maxi

    
    
    def maximumPoints(self, mat):
        
        """
        used dp memoization method to solve this question
        refer to the video in order to understand it properly and revise
        this question is a bit difficult to understand
        also recursive memoization will cause tle at some point.
        therefore need to make it better
        """
        
        # days = len(mat)
        
        # dp_arr = {}
        
        # return self.actualTraining(mat, days-1, 3, dp_arr)
        
        
        """
        by using tabulation method
        we can improve the space complexity
        """
        n = len(mat)
        prev = {}
        
        # this prev array points that for each index, if considered last task
        # then what will be the max point for base cases/
        prev[0] = max(mat[0][1], mat[0][2])
        prev[1] = max(mat[0][0], mat[0][2])
        prev[2] = max(mat[0][0], mat[0][1])
        prev[3] = max(mat[0][0], mat[0][1], mat[0][2])
        
        for day in range(1, n):
            temp = {}
            
            for last in range (4):
                temp[last] = 0
                
                for task in range(3):
                    if task != last:
                        
                        temp[last] = max(temp[last], mat[day][task]+prev[task])
        
            prev = temp
        
        return prev[3]
        

```

## Complexity Analysis ⏳
By using tabulation method of DP
Time Complexity : O(N*4*3)
Space Complexity : O(3)
