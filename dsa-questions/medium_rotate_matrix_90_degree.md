# Rotate Matrix 90 degree (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/rotate-image/description)

## Problem Statement
You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```
```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```


## Understanding 💡

The matrix will rotate 90 degree
```
Input :

-------------
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |
-------------

Output :
-------------
| 7 | 4 | 1 |
| 8 | 5 | 2 |
| 9 | 6 | 3 |
-------------
```

## Approach 🚀
**Brute Approach :**

In a 90-degree clockwise rotation, each element in the matrix moves from its original position to a new position based on a specific pattern. The first column becomes the first row (in reverse order) and second column becomes the second row, and so on.

We can simulate this movement by using a new matrix. For each element at position (i, j) in the original matrix, we calculate its new position in the rotated matrix as (j, n - i - 1) where n is the size of the matrix.- Initialize an empty matrix of the same size (n x n).
- Loop through every element of the original matrix using two nested loops.
- For each element at position (i, j), place it in the new matrix at position (j, n - i - 1).
- After completing the placement for all elements, return or copy the new matrix.

**Optimal Approach :**

To rotate a matrix 90 degrees clockwise in-place (without using extra space), we use two key matrix operations:
- Step 1: Transpose the matrix: swap elements across the diagonal. This converts rows into columns.
- Start the first phase: Transpose the matrix- For each row starting from the top to bottom:
- For each column starting from the diagonal element (excluding already visited elements):
- Swap the current element with the element that is diagonally opposite across the main diagonal.
- This effectively flips the matrix over its top-left to bottom-right diagonal, converting rows into columns.

- Step 2: Reverse each row: this turns the new columns into the final rotated rows.
- Move to the second phase: Reverse each row- For every row in the matrix:
- Reverse the order of the elements in that row (first element becomes last, second becomes second last, and so on).
- This realigns the columns to their correct position for the clockwise rotation.

## Code 🖥️

### Python
```python
from typing import List

def rotateImage(matrix: List[List[int]]) -> List[List[int]]:

    rows = len(matrix)
    cols = len(matrix[0])
    # print(rows, cols)
    """
    Brute Force
    # figure out the correct position
    # and place the element at the position 
    # in a new and[n][n] martix
    # T(n) = n^2 and S(n) = n^2
    """
    # rotated90 = [[0 for _ in range(cols)] for _ in range(rows)]
    #
    # for i in range(rows):
    #     for j in range(cols):
    #         rotated90[j][rows-1-i] = matrix[i][j]
    #
    # return rotated90

    """
    Optimal Approach
    # since brute force uses extra space 
    # and it can be optimized to work in-place matrix
    # step 1 : transpose the matrix
    # step 2 : reverse ever row
    # for transpose, no need to touch diagonal elements
    # only swap (matrix[i][j], matrix[j][i])
    """
    # for i in range(0,rows-1):
    #     for j in range(i+1,cols):
    #         matrix[i][j],matrix[j][i] = matrix[j][i],matrix[i][j]

    # for row in matrix:
    #     row.reverse()

    # return matrix


print("""
-------------
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |
-------------
""")
matrix = [[1,2,3],[4,5,6],[7,8,9]]
output_matrix = rotateImage(matrix)
for row in output_matrix:
    print(row)
```

## Complexity Analysis ⏳
**Brute :**
- Time Complexity: O(N²),Each element of the matrix is visited exactly once and placed into a new matrix, so the time taken is proportional to the total number of elements.
- Space Complexity: O(N²),We use an additional matrix of the same size to store the rotated result, leading to O(N²) extra space.

**Optimal Approach :**
- Time Complexity: O(N²),We traverse every element once during transposition and again during reversal of each row, resulting in a total of O(N²) time.
- Space Complexity: O(1),All operations are done in-place using only temporary variables. No extra matrix is used.

