# Search a 2D Matrix II (TUF, Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/search-a-2d-matrix-ii/description/)

## Problem Statement
Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.
Example 1:
```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
```
Example 2:
```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
```
Constraints:
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= n, m <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- All the integers in each row are sorted in ascending order.
- All the integers in each column are sorted in ascending order.
- `-10^9 <= target <= 10^9`

## Understanding 💡
there are two type for search in matrix question. secone one is where each row matrix is sorted. but here, it's not guaranteed that the last element of current row is smaller than the first element of the next row.

## Approach 🚀
**Brute Force :**- apply linear search on whole matrix
**Better Approach :**
- for each row use binary search and return if found
**Optimal Approach :**
- As we are starting from the cell (0, m-1), the two variables i.e. ‘row’ and ‘col’ will point to 0 and m-1 respectively.
- We will do the following steps until row < n and col >= 0(i.e. while(row < n && col >= 0)):
   - If matrix[row][col] == target: We have found the target and so we will return true.
   - If matrix[row][col] > target: We need the smaller elements to reach the target. But the column is in increasing order and so it contains only greater elements. So, we will eliminate the column by decreasing the current column value by 1(i.e. col--) and thus we will move row-wise.
   - If matrix[row][col] < target: In this case, We need the bigger elements to reach the target. But the row is in decreasing order and so it contains only smaller elements. So, we will eliminate the row by increasing the current row value by 1(i.e. row++) and thus we will move column-wise.
       - If we are outside the loop without getting any matching element, we will return false.

## Code 🖥️

### Python
```python
class Solution:
    def binary_search(self, arr: List[int], target: int) -> bool:

        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if arr[mid] == target:
                return True
            elif arr[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return False

    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        """
        brute force
        - search using linear search in whole martix
        - 0(n^2)
        """

        """
        better approach
        - using binary search on each row to search
        - O(n*log m)
        """
        # found = False
        
        # for row in matrix:
        #     found = self.binary_search(row, target)

        #     if found:
        #         return found

        # return found
        
        """
        optimal approach
        - eleminating the search space based on row and col
        - O(n+m)
        """
        n = len(matrix)
        m = len(matrix[0])

        row = 0
        col = m - 1

        while row < n and col >= 0:
            if target == matrix[row][col]:
                return True
            elif target > matrix[row][col]:
                row+=1
            else:
                col-=1

        return False
```

## Complexity Analysis ⏳
Time Complexity: O(N+M), where N = given row number, M = given column number. We are starting traversal from (0, M-1), and at most, we can end up being in the cell (M-1, 0). So, the total distance can be at most (N+M). So, the time complexity is O(N+M).
Space Complexity: O(1) as we are not using any extra space.

