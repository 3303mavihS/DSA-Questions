# Row with Max 1s in Rowwise Sorted (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1)

## Problem Statement
You are given a 2D binary array `arr[][]` consisting of only `1`s and `0`s. Each row of the array is sorted in non-decreasing order. Your task is to find and return the index of the first row that contains the maximum number of `1`s. If no such row exists, return `-1`.
Note:
- The array follows 0-based indexing.
- The number of rows and columns in the array are denoted by `n`.
Examples:
```
Input: arr[][] = [[0,1,1,1],
               [0,0,1,1],
               [1,1,1,1],
               [0,0,0,0]]
Output: 2
Explanation: Row 2 contains the most number of `1`s (4 `1`s). Hence, the output is `2`.
```
```
Input: arr[][] = [[0,0],
               [1,1]]
Output: 1
Explanation: Row 1 contains the most number of `1`s (2 `1`s). Hence, the output is `1`.
```
```
Input: arr[][] = [[0,0],
               [0,0]]
Output: -1
Explanation: No row contains any `1`s, so the output is `-1`.
```
Constraints:
```
1 ≤ arr.size(), arr[i].size() ≤ 10^3
```

## Understanding 💡
Need to return the index of the row in a 2d matrix which has the most no. of 1.

## Approach 🚀
### Intuition
We will use Binary Search to make our solution more efficient. While we still need to check each row one by one, we can speed up how we count the 1s in each row. Instead of going through every element in a row to count the 1s, we find the position of the first 1 using Binary Search, and subtract that index from the total number of columns to get how many 1s are present.
### Approach
- Start by keeping track of the highest number of 1s seen so far and the row where that occurred.
- Go through each row of the matrix one by one.
- For each row, use Binary Search to find the first position where a 1 appears. Then subtract that position from the total number of columns to get the number of 1s in that row.
- Compare the current row's number of 1s with the highest found so far. If it's greater, update the highest count and the corresponding row number.
- After checking all rows, return the row number where the highest number of 1s was found. If there are no 1s at all, return -1.

## Code 🖥️

### Python
```python
class Solution:
    def count_1s(self, arr):
        """
        we will get the first occurrence of 1 in the arr
        if no 1's found then return the count as 0
        else we calculate the count from the index itself.
        """
        n = len(arr)
        count_1 = 0
        
        low = 0
        high = n - 1
        
        while low <= high:
            mid = low + (high - low)//2
            
            if arr[mid] == 1:
                high = mid - 1
            else:
                low = mid + 1
        
        count_1 = n-low
        
        return count_1
        
        
    def rowWithMax1s(self, arr):
        """
        brute force
        - keep count for each row and than return the row with max count
        - time complexity O(n^2)
        """
        
        """
        better/optimal approach
        - for each row, instead of counting each 1 in that row
        - we check for the first occurence of 1 or the last occurence of 0
        - then we can calculate the count of 1
        - and return the row with max 1 in a row
        """
        max_count_1 = 0
        ans_row = -1
        count = 0

        for ele_row in arr:
            row_count = self.count_1s(ele_row)
            
            if max_count_1 < max(max_count_1, row_count):
                max_count_1 = row_count
                ans_row = count
            
            count+=1
            
        return ans_row
```

## Complexity Analysis ⏳
- Time Complexity:O(n X logm), where n = given row number, m = given column number. We are using a loop running for n times to traverse the rows. Then we are applying binary search on each row with m columns.
- Space Complexity: O(1), no extra space is used.

