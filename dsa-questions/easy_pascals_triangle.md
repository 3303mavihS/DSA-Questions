# Pascal's Triangle (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/pascals-triangle/description/)

## Problem Statement
There can be 3 variation of question related to pascal triangle.
- Return the element value if row and column is given for the element
- Print the nth row of the pascal triangle
- Print the whole pascal triangle

In Pascal's triangle, each number is the sum of the two numbers directly.

## Understanding 💡
A pascal triable somewhat looks like this
```
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
```

## Approach 🚀
**Approach 1 :**
To generate the entire Pascal’s Triangle for the first N rows, we can start with the first row containing a single 1 and iteratively build each subsequent row using the property that every element (except the first and last) is the sum of the two elements directly above it from the previous row. The first and last elements of each row are always 1. By storing the previous row, we can calculate the next row easily. This process continues until we have constructed all N rows, resulting in the complete Pascal’s Triangle structure.

**Approach 2 :**
To print the Nth row of the pascal triangle we can take advantage of the relationship between Nth element and binomial coefficients.
In a pascal's triangle, the Nth row contains the binomial coefficients C(N-1, 0), C(N-1, 1) and so on till C(N-1, N-1). Thus we can simply calculate all these values to return the Nth row of pascal triangle.
Instead of computing full factorials, we can start with the first value as 1, and use the relation C(n, k) = C(n, k−1) × (n−k+1) / k to compute the next value from the previous one in constant time.

**Approach 3 :**
To find the element at the coordinates (R,C) where R is the row number and C is the Column number, we can simply simulate the generation of pascal's triangle for R rows. In Pascal’s Triangle, the element at row R and column C corresponds to the binomial coefficient (r-1)C(c-1). To calculate this binomial coefficient, we can simply apply the formula of binomial coefficient i.e. (r-1)!/(c-1)!(r-c)!.
Instead of computing full factorials (which can overflow and be slow), we can multiply and divide in a loop to compute the coefficient efficiently.

## Code 🖥️

### Python
```python
from typing import List


"""
generate_nth row for approach 2
"""
# def generate_row(n:int) -> List[int]:
#     row = []
#
#     ans = 1
#     row.append(ans)
#
#     for i in range(1, n):
#         ans = ans * (n-i)
#         ans = ans // i
#         row.append(ans)
#
#     return row

"""
Approach 2
"""
# def generate_triangle(no_of_rows:int) -> List[List[int]]:
#     triangle = []
#
#     for row in range(1, no_of_rows+1):
#         triangle.append(generate_row(row))
#
#     return triangle


"""
Approach 1
"""
# def generate_triangle(no_of_rows):
#     # Result list to hold all rows
#     triangle = []
# 
#     # Loop for each row
#     for i in range(no_of_rows):
#         # Create a row with size (i+1) and initialize all elements to 1
#         row = [1] * (i + 1)
# 
#         # Fill elements from index 1 to i-1 (middle values)
#         for j in range(1, i):
#             # Each element = sum of two elements above it
#             row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
# 
#         # Add current row to the triangle
#         triangle.append(row)
# 
#     return triangle


"""
Approach 3
calculate each element by passing the row and column
also solution for first type of question
# Function to compute binomial coefficient (nCr)
"""
# def findPascalElement(self, r, c):
#     # Element is C(r-1, c-1)
#     n = r - 1
#     k = c - 1
# 
#     result = 1
# 
#     # Compute C(n, k) using iterative formula
#     for i in range(k):
#         result *= (n - i)
#         result //= (i + 1)
# 
#     return result

print(generate_triangle(8))


"""
Approach 3
"""
```

## Complexity Analysis ⏳
**Approach 1 :**
- **Time Complexity:** O(N^2), we generate all the elements in first N rows sequentially one by one.
- **Space Complexity:** O(N^2), additional space used for storing the entire pascal triangle.****

**Approach 2 :**
- **Time Complexity:** O(N), we iterate N times to compute each element of the row in O(1) time using the direct relation.
- **Space Complexity:** O(N), additional space used for storing the Nth row.

**Approach 3 :**
- **Time Complexity:** O(min(c,r−c)), The loop runs for min(c−1,r−c) iterations because binomial coefficients are symmetric.
- **Space Complexity:** O(1), constant additional space is used.****

## Edge Cases 🔍
- ✔️ understand the binomial to correctly calculate the element.
