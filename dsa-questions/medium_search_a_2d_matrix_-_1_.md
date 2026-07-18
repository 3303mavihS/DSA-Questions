# Search a 2D Matrix - 1 (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/search-a-2d-matrix/description/)

## Problem Statement
You are given an `m x n` integer matrix `matrix` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.
Given an integer `target`, return `true` *if* `target` *is in* `matrix` *or* `false` *otherwise*.
You must write a solution in `O(log(m * n))` time complexity.
Example 1:
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```
Example 2:
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```
Constraints:
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

## Understanding 💡
there are two type for search in matrix question. first one is where whole matrix is sorted. first element of an row is greater than the last row of the previous row. we need to return true or false based search result

## Approach 🚀
If we flatten the given 2D matrix into a 1D array, that 1D array would also be sorted. By running binary search on this flattened version, we could quickly check if the element exists.
But actually flattening the matrix takes extra time and memory, which makes it inefficient. Instead, we can simulate the flattening without creating a new array. The trick is to directly map a 1D index into the corresponding row and column of the 2D matrix.
To do this mapping, if there are `m` columns in the matrix and the index is `i`, then:
Row = i / m, Column = i % m.
So instead of working on the 2D matrix directly, we pretend it’s a sorted 1D array of length (rows × columns), and apply binary search on this imaginary array.
- Start with two pointers: one at the first index of the imaginary 1D array, and the other at the last index.
- While the first pointer does not cross the last:  - Find the middle index between the two pointers.
  - Convert this middle index into a row and column of the original 2D matrix.
  - If the element at that position matches the target, return true (element found).
  - If the element is smaller than the target, discard the left half and continue searching in the right half.
  - If the element is larger than the target, discard the right half and continue searching in the left half.
- If the search ends without finding the element, return false (element not present in the matrix).

## Code 🖥️

### Python
```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:

        """
        to get the answer in log(m*n) for this version of the search matrix.
        where last element of a row is smaller than the first element of next row.
        we implement binary search on the last element to determine which
        row may have the value. and we do binary search on that row.
        """
        row_n = len(matrix[0])
        col_n = len(matrix)

        low = 0
        high = row_n * col_n - 1

        while low <= high:
            mid = low + (high - low) // 2

            if target == matrix[mid//row_n][mid % row_n]:
                return True
            if target < matrix[mid//row_n][mid % row_n]:
                high = mid - 1
            else: 
                low = mid + 1

        

        return False
```

## Complexity Analysis ⏳
Time Complexity: O(log(NxM)), where N = given row number, M = given column number.We are applying binary search on the imaginary 1D array of size NxM.
Space Complexity: O(1) as we are not using any extra space.

