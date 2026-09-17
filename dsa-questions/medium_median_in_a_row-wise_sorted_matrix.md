# Median in a Row-Wise Sorted Matrix (GeeksForGeeks, TUF) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1)

## Problem Statement
Given a row-wise sorted matrix mat[][] of size n x m, where the number of rows and columns is always odd. Return the median of the matrix.
Examples:
```
Input: mat[][] = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]
Output: 5
Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.
```
```
Input: mat[][] = [[2, 4, 9], [3, 6, 7], [4, 7, 10]]
Output: 6
Explanation: Sorting matrix elements gives us [2, 3, 4, 4, 6, 7, 7, 9, 10]. Hence, 6 is median.
```
```
Input: mat = [[3], [4], [8]]
Output: 4
Explanation: Sorting matrix elements gives us [3, 4, 8]. Hence, 4 is median.
```
Constraints:
1 ≤ n, m ≤ 400
1 ≤ mat[i][j] ≤ 2000

## Understanding 💡
Need to return the median of a matrix. but the row are already sorted and n and m are always odd.

## Approach 🚀
In a row-wise sorted matrix, each row is individually sorted, but the entire matrix isn’t globally sorted. Hence, we can’t just pick the middle element directly to get the median. If we flatten and sort the entire matrix, it would take O(N×M log(N×M)) time, which is inefficient. Instead, we can take advantage of the sorted rows and apply a more optimized method using binary search on the value space (i.e., the range of possible numbers in the matrix).
We start by finding the minimum and maximum elements in the matrix. The smallest element will be in the first column, and the largest element will be in the last column. We then binary search between this range to find the median value.
In each iteration of the binary search, we choose a middle value and count how many elements in the matrix are less than or equal to it. Since each row is sorted, we can do this efficiently using binary search (upper bound) on each row. If the count is less than or equal to half of the total number of elements, we move our search range to the right, otherwise, we move it to the left.

## Code 🖥️

### Python
```python
class Solution:
    def get_min_max_of_matrix(self, matrix):
        min_val = matrix[0][0]
        max_val = 0

        n = len(matrix)
        m = len(matrix[0])

        for i in range(n):
            if matrix[i][0] <= min_val:
                min_val = matrix[i][0]

        for i in range(n):
            if matrix[i][m-1] >= max_val:
                max_val = matrix[i][m-1]

        return min_val, max_val

    def upper_bound_index(self, arr, k):
        # print("working arr :", arr)
        n = len(arr) - 1

        low = 0
        high = n

        while low <= high:
            mid = low + (high-low)//2

            if arr[mid] < k:
                low = mid + 1
            elif arr[mid] > k:
                high = mid - 1
            else:
                if mid == n:
                    return mid + 1

                if arr[mid+1] > k:
                    return mid + 1
                else:
                    low = mid + 1

        return low

    def get_no_of_smaller_eql(self, matrix, bound_value):
        no_of_elements = 0

        """
        either we can just go through whole matrix to count the
        no. of element smaller than or equal to bound_value making
        the time complexity to O(n*m)
        """

        """
        or we apply upper bound to count no. of elements in each row
        and the time complexity comes to O(n*log m)
        """
        for i in range(len(matrix)):
            ans = self.upper_bound_index(matrix[i], bound_value)
            # print(f"row {i} : ",ans)

            no_of_elements += ans

        return no_of_elements


    def median(self, matrix):
        n = len(matrix)
        m = len(matrix[0])

        """
        Brute force for this question will be where we
        flatten this matrix and put all the element in
        an array of n*m size. and then sort the whole 
        array and get the (n*m)//2 th element from that
        array and return it. making the time complexity
        of O(n*m) since we have traverse the whole matrix
        and then sort it so for that O(n*log m).
        space complexity will also rise with O(n*m)
        """

        """
        and to optimize this we can work on the space complexity and 
        time complexity by some observation. since n and m are odd 
        and the total no of elements in the matrix will always be odd.
        so we know that any element on (n*m)//2 th index will be median.
        now we also that minimum ((n*m)//2)-1 elements will be smaller 
        or equal to the median. now that median value will lie in a range
        of min. of matrix and max. of matrix. so by applying the binary
        search we can reach that element. here we don't need to sort a 
        flattened matrix. instead we need to know the element which has
        minimum ((n*m)//2)-1 elements. and that exact element will be the
        median. with binary search we will try to reach the element that 
        satisfies this condition.
        """
        low, high = self.get_min_max_of_matrix(matrix)
        req = (n*m)//2

        while low<=high:
            # print(f"low : {low}, high : {high}")
            mid = low + (high-low)//2
            # print("mid :",mid)
            no_of_smaller_eql = self.get_no_of_smaller_eql(matrix, mid)
            # print("no_of_smaller_eql :", no_of_smaller_eql)
            if no_of_smaller_eql <= req:
                low = mid + 1
            else:
                high = mid - 1

        return low
```

## Complexity Analysis ⏳
Time Complexity: O(rows × log(max - min) × log(cols)), Binary search runs on the value space from min to max of the matrix and for each mid in binary search, we count how many numbers are less than or equal to mid
Space Complexity: O(1), constant extra space is used.

