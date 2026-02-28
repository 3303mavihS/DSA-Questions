# Set Matrix Zero (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/set-matrix-zeroes/description/)

## Problem Statement
Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.
```
Input: matrix=[[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
Explanation: Since matrix[2][2]=0.Therfore the 2nd column and 2nd row wil be set to 0.
```
```
Input: matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output:[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
Explanation:Since matrix[0][0]=0 and matrix[0][3]=0. Therefore 1st row, 1st column and 4th column will be set to 0``
```
## Understanding 💡
all the element in row and column of an matrix m x n should be changed as 0 if the element is 0. and avoid newly made change to be treated as 0 and updating the row and column of the element.

## Approach 🚀
**Brute** : Think of the matrix as a chessboard. If you see a zero somewhere, you need to wipe out its whole row and column to zero. In brute force, the moment you find a zero, you immediately mark its entire row and column. But here’s the trap if you set them to zero immediately, we might mess up future checks because a newly placed zero could cause extra unwanted zeroing. To avoid that, we use a special marker value (like -1 or something that can’t exist in the input) to mark places where zeros should be placed later. Once the scanning is done, we do a second pass and replace all markers with 0.
- Traverse the entire matrix.
- If an element is zero:
- Once the full traversal is complete, replace all -1 with 0.

**Better :** Instead of marking directly in the matrix, keep two extra arrays:
- One to track which rows need to be zeroed.
- One to track which columns need to be zeroed.
When you find a zero, mark its row index in the row array and column index in the col array. After the scan, you go back and zero out all marked rows and columns. This avoids accidental over-zeroing in the first pass.- Create a row array of size m (rows) and a col array of size n (columns) initialized to false.
- First pass: Traverse the matrix, and when you find a zero:
- Second pass: Traverse the matrix again, and if either the row or col is marked, set the cell to zero

**Optimal :** Instead of using separate arrays, we use the first row and first column of the matrix itself to store whether a row or column needs to be zeroed. We also store two flags:
- firstRowZero:Was the first row supposed to be all zero?
- firstColZero:Was the first column supposed to be all zero?
Then:- First pass: Mark zeros in the first row and column for any zero found in the rest of the matrix.
- Second pass: Use those markers to set rows and columns to zero.
Finally, handle the first row and column separately based on the flags. This is super space-efficient because we’re reusing the input matrix itself to store markers.- Check if the first row has any zero and store in a boolean flag.
- Check if the first column has any zero and store in a boolean flag.
- Traverse the rest of the matrix:
- Traverse again (excluding first row and column), setting cells to zero if their row marker or column marker is zero.
- Finally, update the first row and first column based on the stored flags.

## Code 🖥️

### Python
```python
from typing import List

# def markRow(i, matrix: List[List[int]]):
#     # print(len(matrix))
#     for j in range(len(matrix[0])):
#         if matrix[i][j] != 0:
#             matrix[i][j] = float('-inf')
#
# def markCol(j, matrix: List[List[int]]):
#     # print(len(matrix[0]))
#     for i in range(len(matrix)):
#         if matrix[i][j] != 0:
#             matrix[i][j] = float('-inf')

def setZeroes(matrix: List[List[int]]) -> List[List[int]]:
    rows = len(matrix)
    cols = len(matrix[0])

    # print(rows, cols)

    """
    Brute Force
    # Do Exactly what is required
    # But use -1 to mark whichever element will be changed
    # in order to avoid the incorrect matrix
    """
    # INT_MIN = float('-inf')

    # for i in range(rows):
    #     for j in range(cols):
    #         # print(matrix[i][j])
    #         if matrix[i][j] == 0:
    #             markRow(i,matrix)
    #             markCol(j,matrix)
    #
    # for i in range(rows):
    #     for j in range(cols):
    #         # print(matrix[i][j])
    #         if matrix[i][j] == INT_MIN:
    #             matrix[i][j] = 0
    #
    # return matrix

    """
    Better Approach
    # reduce the time complexity from O(n^3)
    # to O(n^2) by reducing the iteration for marking the rows and columns
    # instead we take two array for n size and m size 
    # by increasing the space complexity by O(n+m)
    # and mark the element in those array for arr[i][j]
    """
    # new_rows = [1] * rows
    # new_cols = [1] * cols
    #
    # # print(new_rows)
    # # print(new_cols)
    #
    # for i in range(rows):
    #     for j in range(cols):
    #         if matrix[i][j] == 0:
    #             new_rows[i] = 0
    #             new_cols[j] = 0
    #
    # for i in range(rows):
    #     for j in range(cols):
    #         if not new_rows[i] or not new_cols[j]:
    #             matrix[i][j] = 0
    #
    # return matrix
    #
    # # print(new_rows)
    # # print(new_cols)


    """
    Optimal Approach
    # reduce the space complexity to O(1)
    # and time complexity to O(n^2)
    # also optimize it by assuming the matrix[0][j] and matrix[i][0]
    # as the extra arrays
    # and by using the better way we work on this. 
    """

    # # Flag to track if first row should be zeroed
    # first_row_zero = False
    # # Flag to track if first column should be zeroed
    # first_col_zero = False

    # # Check if first column has any zero
    # for i in range(rows):
    #     if matrix[i][0] == 0:
    #         first_col_zero = True
    #         break

    # # Check if first row has any zero
    # for j in range(cols):
    #     if matrix[0][j] == 0:
    #         first_row_zero = True
    #         break

    # print(first_row_zero, first_col_zero)

    # for i in range(1, rows):
    #     for j in range(1, cols):
    #         if matrix[i][j] == 0:
    #             if matrix[i][j] == 0:
    #                 matrix[i][0] = 0
    #                 matrix[0][j] = 0

    # for i in range(1, rows):
    #     for j in range(1, cols):
    #         if matrix[i][0] == 0 or matrix[0][j] == 0:
    #             matrix[i][j] = 0

    # # Zero the first row if needed
    # if first_row_zero:
    #     for j in range(cols):
    #         matrix[0][j] = 0

    # # Zero the first column if needed
    # if first_col_zero:
    #     for i in range(rows):
    #         matrix[i][0] = 0

    # return matrix


print("""
_____________
| 1 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |
-------------
""")
matrix = [[1,1,1],[1,0,1],[1,1,1]]
#
# print("""
# _________________
# | 0 | 1 | 2 | 0 |
# | 3 | 4 | 5 | 2 |
# | 1 | 3 | 1 | 5 |
# -----------------
# """)
# matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]

# print("""
# _______
# | -1  |
# |  2  |
# |  3  |
# -------
# """)
# matrix = [[-1],[2],[3]]

# print("""
# _____________
# | 1 | 0 | 3 |
# -------------
# """)
# matrix = [[1,0,3]]

print(setZeroes(matrix))
```

## Complexity Analysis ⏳
**Brute :**
- Time Complexity: O(m * n * (m + n)), We iterate through every cell (m * n), and for each zero, we potentially mark its entire row (O(n)) and column (O(m)), leading to O(m * n * (m + n)) overall.
- Space Complexity: O(1), We are not using any extra data structures, only modifying the matrix in place (apart from a few variables).****

**Better :**
- Time Complexity: O(m × n),We make two passes over the matrix.First pass to identify rows and columns to be zeroed (O(m × n)).Second pass to update the matrix using the markers (O(m × n)).Total time is proportional to the number of cells in the matrix, so O(m × n).
- Space Complexity: O(m + n),We store two extra arrays one for m rows and one for n columns. No other extra space is used besides these arrays.

**Optimal :**
- Time Complexity: O(m × n),We iterate over the entire matrix a constant number of times (first pass for markers, second pass for zeroing, final pass for first row/col), where m = number of rows and n = number of columns.
 - Space Complexity: O(1),No extra space is used apart from a few boolean flags; all marker information is stored within the first row and column of the matrix itself.

## Edge Cases 🔍
- ✔️ if the elements are negative than using the brute force will not work with -1. use INT_MIN.
