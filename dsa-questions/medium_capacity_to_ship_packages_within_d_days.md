# Capacity To Ship Packages Within D Days (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/)

## Problem Statement
A conveyor belt has packages that must be shipped from one port to another within `days` days.
The `ith` package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.
Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.
Example 1:
```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
```
Example 2:
```
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
```
Example 3:
```
Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
```
Constraints:
- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

## Understanding 💡
need to return min weight that can transport all the adjacent packages with total weight within the min weight. and that min weight will make sure all the packages can be loaded within given time (days)before that we need to get the range of weight that can be considered for any day. with small observation. the min weight can not be less than the max weighted package and also the max weight can not exceed the total weight of all the packages.

## Approach 🚀
We want to find the minimum ship capacity that allows shipping all packages within the given number of days. The capacity must be at least the heaviest package because you can’t split a package. At the same time, the capacity can be at most the sum of all packages (if you ship everything in one day). So the answer lies between these two extremes. Using binary search on this range lets us efficiently find the smallest capacity that works. For each candidate capacity, we check if it’s possible to ship all packages within the given days by greedily accumulating package weights until we reach capacity, then moving to the next day.
- Set the lower bound as the maximum weight in the packages.
- Set the upper bound as the sum of all package weights.
- While the lower bound is less than or equal to the upper bound, do:  
  - Pick the middle value between lower and upper bounds as the candidate capacity.
  - Simulate shipping with this capacity: accumulate package weights until capacity is reached, then count a day and reset accumulation.
  - If the number of days used is within the allowed days, move the upper bound down to try smaller capacities.
  - If the number of days exceeds the allowed days, increase the lower bound to try larger capacities.
- Return the lower bound when the search finishes as the minimum capacity needed.

## Code 🖥️

### Python
```python
class Solution:
    
    def countDaysForWeight(self, weightList, w):
        daysCount = 0
        weightCount = 0

        for weight in weightList:
            if weightCount <= w:
                weightCount+=weight
            
            if weightCount > w:
                daysCount += 1
                weightCount = weight

        if weightCount <= w:
            daysCount += 1
        
        return daysCount




    def shipWithinDays(self, weights: List[int], days: int) -> int:
        """
        need to return min weight that can transport all the adjacent packages
        with total weight within the min weight. and that min weight will make sure 
        all the packages can be loaded within given time (days)

        before that we need to get the range of weight that can be considered 
        for any day. with small observation. the min weight can not be less than the
        max weighted package and also the max weight can not exceed the total weight of
        all the packages.
        """

        """
        Brute Force
        since, we have guessed the range we can calculate no. of days it will take
        to transport all the packages. and once we get a weight that allow all the packages
        equal to the days given we return the answer otherwise we continue.
        """


        """
        Optimal approach
        applying binary search on the given range
        """

        low = max(weights)
        high = sum(weights)

        while low <= high:

            mid = low + (high-low) // 2

            dayCount = self.countDaysForWeight(weights, mid) 
            if dayCount <= days:
                high = mid - 1
            else :
                low = mid + 1

        return low

```

## Complexity Analysis ⏳
- Time Complexity: O(N * log(S)), where N is number of packages and S is the search space (sum_weights - max_weight). Each binary search step takes O(N), repeated O(log S) times.
- Space Complexity: O(1), constant extra space used.

