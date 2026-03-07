# Spiral Traversal of Matrix (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/spiral-matrix/description/)

## Problem Statement
Given an `m x n` `matrix`, return *all elements of the* `matrix` *in spiral order*.
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```
```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## Understanding 💡
Instead of normal traversal of the matrix, we need to traverse into a spiral way. direction of traversal.
```
start ---> right ----> bottom -----> left -----> top -----> right continue.
```

## Approach 🚀
The brute force method simulates movement in four directions: right, down, left, and up while keeping track of which cells have already been visited using a separate matrix. This approach ensures that we never revisit any element and always stay within bounds. After moving in one direction as far as possible, we rotate the direction and keep repeating until all elements are visited.- Initialize a 2D boolean matrix `visited` of same size as input to keep track of visited cells.
- Define direction arrays for right, down, left, and up movements.
- Start at (0, 0), and begin with direction = 0 (right).
- For each of the total elements in the matrix:- Add the current cell to result and mark it as visited.
- Check if the next cell in the current direction is valid and not visited.
- If valid, move to it; else rotate the direction and try the new direction.
- Repeat this for total number of cells in the matrix.

## Code 🖥️

### Python
```python
from typing import List

def spiralOrder(matrix: List[List[int]]) -> List[int]:
    rows = len(matrix)
    cols = len(matrix[0])

    top = 0
    left = 0
    right = cols - 1
    bottom = rows - 1

    ans = []

    # print(f"Top : {top}, Left : {left}, Right : {right}, Bottom : {bottom}")

    while top<=bottom and left<=right:
        for i in range(left, right+1):
            ans.append(matrix[top][i])

        top+=1

        for i in range(top, bottom+1):
            ans.append(matrix[i][right])

        right-=1

        if top <= bottom:
            for i in range(right, left-1, -1):
                ans.append(matrix[bottom][i])

            bottom-=1

        if left <= right:
            for i in range(bottom, top-1, -1):
                ans.append(matrix[i][left])

            left+=1


    # print(f"Top : {top}, Left : {left}, Right : {right}, Bottom : {bottom}")

    return ans


# print('''
# ------------------------------
# |   1   |   2  |   3  |   4  |
# |   5   |   6  |   7  |   8  |
# |   9   |  10  |  11  |  12  |
# |  13   |  14  |  15  |  16  |
# ------------------------------
# ''')
# matrix = [[1,2,3],[5,6,7],[9,10,11],[13,14,15]]
# matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
# matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]

print('''
-------------------------
|  1 |  2 |  3 |  4 | 5 |
| 16 | 17 | 18 | 19 | 6 |
| 15 | 24 | 25 | 20 | 7 |
| 14 | 23 | 22 | 21 | 8 |
| 13 | 12 | 11 | 10 | 9 |
-------------------------
''')
matrix = [[1,2,3,4,5],[16,17,18,19,6],[15,24,25,20,7],[14,23,22,21,8],[13,12,11,10,9]]

print(spiralOrder(matrix))


```

## Complexity Analysis ⏳

**Time Complexity:** O(m × n),Because we visit each element of the matrix exactly once, where `m` is the number of rows and `n` is the number of columns.

**Space Complexity:** O(1)We use only a few integer variables to keep track of boundaries (top, bottom, left, right). The `result` vector is part of the output, so it's not counted as extra space.

## Edge Cases 🔍
- ✔️ when n!=m. then either m>n or n<m. in that case the traversal need to stop at correct position. otherwise it will traverse an extra. there we use the if top<=bottom and left<=right condition.
