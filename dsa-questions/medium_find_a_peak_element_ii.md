# Find a Peak Element II (Leetcode, TUF) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/find-a-peak-element-ii/)

## Problem Statement
A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom.
Given a 0-indexed `m x n` matrix `mat` where no two adjacent cells are equal, find any peak element `mat[i][j]` and return *the length 2 array *`[i,j]`.
You may assume that the entire matrix is surrounded by an outer perimeter with the value `-1` in each cell.
You must write an algorithm that runs in `O(m log(n))` or `O(n log(m))` time.
Example 1:
```
Input: mat = [[1,4],[3,2]]
Output: [0,1]
Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.
```
Example 2:
```
Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
Output: [1,1]
Explanation: Both 30 and 32 are peak elements so [1,1] and [2,2] are both acceptable answers.
```
Constraints:
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 105`
- No two adjacent cells are equal.

## Understanding 💡
Need to get the peak element of the whole matrix, a peak element is a element that has top,bottom,left and right element smaller than that element. there can be multiple peak elements, but we can return the first one. also we can imagine the matrix is covered by -1 around it so that when an edge element can also become a peak element

## Approach 🚀
To solve this problem we use the binary search approach.
The key idea comes from how we find a peak in a 1-D array:- For any middle position (mid), we check if it’s larger than both its neighbors, if it is, we’ve found a peak.
- If mid is smaller than the element on its left, that means a peak must be somewhere to the left, so we can discard the right half.
- If mid is smaller than the element on its right, then a peak must lie to the right, allowing us to discard the left half.
- This method reduces the number of elements we need to consider in every step, improving efficiency.
For a 2-D array,- The search will cover the column range from 0 to col-1, where col is the total number of columns.
- We choose a middle column and identify the row with the largest element in that column.
- We apply similar logic as in 1-D: if this element is bigger than both its side neighbors, we’ve found the peak.
- If the left neighbor is bigger, we only search the left part; if the right neighbor is bigger, we search the right part.

## Code 🖥️

### Python
```python
class Solution:

    def get_max_in_column(self,  mat:List[List[int]], column:int) -> int:
        peak_index = 0

        for i in range(len(mat)):
            if mat[i][column] > mat[peak_index][column]:
                peak_index = i

        return peak_index

    def findPeakGrid(self,  mat: List[List[int]]) -> List[int]:
        """
        the most brute force solution to this question will be 
        going through each and every element to look for the
        peak element satisfying conidition. that make the 
        time complexity as O(mxn).
        """

        """
        but we can optimize the part where we pick the element  that
        means instead of checking the peak element satisfying condition
        we pick and element and check the condition. applying binary
        search to get the element will bring the time complexity to
        O(logm * n) where n will be searching the max element in a
        row/column.
        """

        if len(mat[0]) == 1:
            return [self.get_max_in_column(mat, 0), 0]

        low = 0
        high = len(mat[0]) - 1

        while low <= high:
            mid = low + (high - low) // 2

            peak_index_in_col = self.get_max_in_column(mat, mid)

            if mid == 0:
                if mat[peak_index_in_col][mid] > mat[peak_index_in_col][mid+1]:
                    return [peak_index_in_col, mid]

            if mid == len(mat[0]) - 1:
                if mat[peak_index_in_col][mid] > mat[peak_index_in_col][mid-1]:
                    return [peak_index_in_col, mid]
            
            if mat[peak_index_in_col][mid] > mat[peak_index_in_col][mid-1] and mat[peak_index_in_col][mid] > mat[peak_index_in_col][mid+1]:
                    return [peak_index_in_col, mid]
            elif mat[peak_index_in_col][mid] < mat[peak_index_in_col][mid+1]:
                low = mid + 1
            else:
                high = mid - 1
        
        return [0, 0]


#    0
# 0 [1]
# 1 [3]
# 2 [2]

#       0  1  2  3  4
#   -1 -1 -1 -1 -1 -1 -1
# 0 -1 41  8  2 48 18 -1
# 1 -1 16 15  9  7 44 -1
# 2 -1 48 35  6 38 28 -1
# 3 -1  3  2 14 15 33 -1
# 4 -1 39 36 13 46 42 -1
#   -1 -1 -1 -1 -1 -1 -1


#    0  1  2  3  4  5  6  7  8
# 0[ 3,47,23,40,28,18,41, 4, 5]
# 1[43,41,26,24,33,48,44,11, 2]
# 2[10,39,44,29, 3, 9, 5,16,50]
# 3[42,24,25,37,39,10,44,29,24]
# 4[24,29,49, 5,37, 9,34,24,26]
# 5[21,42,18,16, 8, 2,48,12,32]
# 6[34,25,36, 8,17,50,17,46,29]

```

## Complexity Analysis ⏳
- Time Complexity: O(N * logM), where N is the number of rows in the matrix, M is the number of columns in each row. The complexity arises because binary search is performed on the columns, and for each mid column, a linear search through the rows is executed to find the maximum element.
- Space Complexity: O(1) as no additional space is used.
