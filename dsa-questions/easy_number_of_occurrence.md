# Number of occurrence (TUF, GeeksForGeeks) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1)

## Problem Statement
Given a sorted array, arr[] and a number target, you need to find the number of occurrences of target in arr[].
Examples :
```
Input: arr[] = [1, 1, 2, 2, 2, 2, 3], target = 2
Output: 4
Explanation: target = 2 occurs 4 times in the given array so the output is 4.
```
```
Input: arr[] = [1, 1, 2, 2, 2, 2, 3], target = 4
Output: 0
Explanation: target = 4 is not present in the given array so the output is 0.
```
```
Input: arr[] = [8, 9, 10, 12, 12, 12], target = 12
Output: 3
Explanation: target = 12 occurs 3 times in the given array so the output is 3.
```
Constraints:
```
1 ≤ arr.size() ≤ 10^6
1 ≤ arr[i] ≤ 10^6
1 ≤ target ≤ 10^6
```

## Understanding 💡
counting the occurences of target element in an sorted array and return the count using log n.

## Approach 🚀
- We will get the first and the last occurrences of the number.
- After getting the indices, we will check the following cases:  - If the first index == -1: This means that the target value is not present in the array. So, we will return 0 as the answer.
  - Otherwise: We will find the total number of occurrences like this:
  - The total number of occurrences  = (last index - first index + 1) and return this length as the answer.

## Code 🖥️

### Python
```python
class Solution:
    def findFirst(self, nums, n, target):
        low = 0
        high = n - 1

        ans = -1

        while low <= high:

            mid = low + (high - low) // 2

            if nums[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        # print(ans)
        # print(nums[ans])

        if ans != -1 and nums[ans] != target:
            ans = -1

        return ans

    def findLast(self, nums, n, target):
        low = 0
        high = n - 1

        ans = -1

        while low <= high:

            mid = low + (high - low) // 2

            if nums[mid] <= target:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        # print(ans)
        # print(nums[ans])

        if ans != -1 and nums[ans] != target:
            ans = -1

        return ans

    def countFreq(self, nums, target):
        n = len(nums)

        first = self.findFirst(nums, n, target)
        last = self.findLast(nums, n, target)

        cnt = 0
    
        if first == -1 and last == -1:
            return cnt
    
        cnt = last - first + 1
    
        return cnt

```

## Complexity Analysis ⏳
- Time Complexity: O(2*logN), We are basically using the binary search algorithm twice.
- Space Complexity: O(1), as we are using no extra space.
