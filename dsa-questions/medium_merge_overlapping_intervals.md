# Merge Overlapping Intervals (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/merge-intervals/description/)

## Problem Statement
Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.
Example 1:
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```
Example 2:
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```
Example 3:
```
Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
```

## Understanding 💡
Return the list of intervals that can't be merged and no other overlapping subintervals between them.

## Approach 🚀
**Brute Force :**

The main idea is to combine intervals that overlap with each other. To do this easily, we first sort the intervals by their starting point so that all overlapping intervals come next to each other. Then, for each interval, we try to see if the next ones overlap with it. If they do, we merge them into one bigger interval. We keep doing this until we find a non-overlapping interval, and then start the process again from that point.
- Sort all intervals based on their starting points. This helps bring all overlapping intervals next to each other.
- Go through each interval one by one and if the current interval is already covered by a previously merged interval, skip it. Else, pick the current interval as the starting point of a new merged interval.
- Now run another loop to check if the following intervals overlap with the current one
- If the start of next interval is less than or equal to the end of the current merged interval, it means they overlap. Therefore, extend the end of the merged interval to be the maximum of the two ends.
- Keep doing this for the next intervals as long as they overlap. As soon as you find an interval that doesn't overlap, break the inner loop and move back to the outer loop to process the next non-overlapping interval.
- Store each merged interval in the final answer list and after the loop ends, return the list of merged intervals.


**Better/Optimal Approach :**

Instead of checking each interval with every other one (as in brute-force), we first sort the intervals, so that any overlapping intervals will come one after the other. This way, we only need to compare each interval with the last one added to our answer. If they overlap, we merge them. If they don’t, we simply add the current interval as a new entry.

- Sort the intervals based on their starting points. This ensures overlapping intervals come together.
- Initialize an empty list to store the final merged intervals.
- If the list is empty or the current interval starts after the last one ends, it means there is no overlap, so just add it to the list.
- If the current interval starts before or exactly at the end of the last one, it means there is overlap. So, combine both by extending the end of the last one to the further end of the two.
- Keep doing this until all intervals have been checked. The final list will now contain only non-overlapping, merged intervals.

## Code 🖥️

### Python
```python
from typing import List

def merge_overlapping(intervals : List[List[int]]) -> List[List[int]]:
    ans_interval = []
    # ans_interval.extend(intervals)

    """
    brute force
    sort the intervals first based on the first element.
    now for each interval in sorted list. check if the following
    intervals comes in the current one.
    """
    n = len(intervals)
    # intervals.sort()
    #
    # for i in range(n):
    #     start = intervals[i][0]
    #     end = intervals[i][1]
    #
    #     # Skip if already merged
    #     if ans_interval and start <= ans_interval[-1][1]:
    #         continue
    #
    #     for j in range(i+1, n):
    #         if intervals[j][0] > end:
    #             break
    #
    #         if intervals[j][1] <= end:
    #             continue
    #
    #         if intervals[j][0] <= end < intervals[j][1]:
    #             end = max(end, intervals[j][1])
    #
    #     ans_interval.append([start,end])

    """
    optimal approach
    sort it and check if the next start is less than or equal to current interval's end.
    expand the interval till possible and once we hit the next start > current end
    push the new interval to ans_list
    """
    intervals.sort()

    for interval in intervals:
        if not ans_interval or ans_interval[-1][1] < interval[0]:
            ans_interval.append(interval)
        else:
            ans_interval[-1][1] = max(ans_interval[-1][1], interval[1])

    return ans_interval


intervals = [[1,3],[2,6],[8,9],[9,11],[8,10],[2,4],[15,18],[16,17]]

print(merge_overlapping(intervals))
```

## Complexity Analysis ⏳
**Brute Force :**
- Time Complexity: O(N^2), for every interval we check all future intervals.
- Space Complexity: ON), additonal space used to store the non-overlapping intervals.

**Better/Optimal Approach :**
- Time Complexity: O(N*logN) + O(N), we sort the entire array and then merge them in a single pass.
- Space Complexity: ON), additonal space used to store the non-overlapping intervals.

