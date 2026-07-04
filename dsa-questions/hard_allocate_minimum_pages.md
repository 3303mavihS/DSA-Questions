# Allocate Minimum Pages (TUF, GeeksForGeeks) 🔴

**Difficulty:** Hard

[Problem Link](https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1)

## Problem Statement
## Problem Statement
Given an array arr[] of integers, where each element arr[i] represents the number of pages in the i-th book. You also have an integer k representing the number of students. The task is to allocate books to each student such that:
- Each student receives atleast one book.
- Each student is assigned a contiguous sequence of books.
- No book is assigned to more than one student.
- All books must be allocated.
The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the smallest possible maximum. If it is not possible to allocate books to all students, return -1;
Note: Test cases are generated such that the answer always fits in a 32-bit integer.
Examples:
```
Input: arr[] = [12, 34, 67, 90], k = 2
Output: 113
Explanation: Allocation can be done in following ways:
=> [12] and [34, 67, 90] Maximum Pages = 191
=> [12, 34] and [67, 90] Maximum Pages = 157
=> [12, 34, 67] and [90] Maximum Pages = 113.
The third combination has the minimum pages assigned to a student which is 113.
```
```
Input: arr[] = [15, 17, 20], k = 5
Output: -1
Explanation: Since there are more students than total books, it's impossible to allocate a book to each student.
```
Constraints:
`1 ≤ arr.size() ≤ 10^6`
`1 ≤ arr[i], k ≤ 10^4`

## Understanding 💡
so here we are given an array with no of pages. and we need to assign k student some book in such order that all the books will be allocated. and every student will get book(s) now a student can be allocated multiple books, but we need to assing the book in such way that the total no. of pages from book should be minimum out of all possible ways. basically it's possible we can give all the books to one of the student but other students will 1 books. but this way student will have max no. of pages. but we need to return minimum from those pages. means upto these much sum of pages we can allocate the books to student and still allocated all the students all the books.

## Approach 🚀
- This problem is solved using Binary Search to efficiently find the best way to distribute books among students.
- The main idea is to cut the search range in half each time by checking whether a certain number of pages per student is possible or not.
- The possible range of answers lies between the largest book (since no student can receive less than the largest book) and the total number of pages (which means giving all books to one student).
- First, if there are more students than books, it's impossible to assign at least one book to each student, so we return -1.
- Next, we search between the minimum and maximum possible values:  - The minimum possible is the largest single book (because every student must get at least one complete book).
  - The maximum possible is the sum of all pages (if one student reads all books).
- We perform Binary Search:  - We try a middle value of pages per student.
  - We check how many students would be required if no student gets more than that value.
  - If it takes more students than allowed, that value is too low, so we try a higher one.
  - If it fits within the allowed number of students, we store it and try a smaller one to find an even better option.
- Eventually, we land on the smallest value that works this is our answer.
- Note: After the binary search loop ends, the pointer will be on the smallest possible maximum number of pages per student. That's why it gives the correct result directly.

## Code 🖥️

### Python
```python
class Solution:
    
    def allocate_books(self, arr, k, pages):
        student_count = 1
        pages_allocated = 0
        
        for book in arr:
        
            if pages_allocated + book <= pages:
                pages_allocated += book
        
            else:
                student_count += 1
                pages_allocated = book
        
        return student_count

    def findPages(self, arr, k):
        """
        so here we are given an array with no of pages.
        and we need to assign k student some book in such order
        that all the books will be allocated. and every student will get book(s)
        now a student can be allocated multiple books, but we 
        need to assing the book in such way that the total no. of pages from book 
        should be minimum out of all possible ways. 
        basically it's possible we can give all the books to one of the student
        but other students will 1 books. but this way student will have max no. of pages.
        but we need to return minimum from those pages.
        means upto these much sum of pages we can allocate the books to student
        and still allocated all the students all the books.
        """
        
        """
        so basically we can make our assumption that the pages that has such value
        will lie between a range. and the range can not be less than the min page
        and can not exceed the sum of all the pages.
        """
        
        """
        brute force
        we move one by one linear search and check how many students will it take to 
        allocate all the books with such pages.
        """
        
        """
        optimal appraoch
        using binary search we keep eliminating the not the answer values
        and keep doing the same thing.
        """
        
        if len(arr) < k:
            return -1
            
        if k == 1:
            return sum(arr)
        
        low = max(arr)
        high = sum(arr)
        
        while low <= high:
            
            mid = low + (high-low) // 2
            
            students = self.allocate_books(arr, k, mid)
            
            if students <= k:
                high = mid -1
            else:
                low = mid + 1
                
        return low


        

```

## Complexity Analysis ⏳
Time Complexity: O(N * log(sum(arr[])-max(arr[])+1)), where N = size of the array, sum(arr[]) = sum of all array elements, max(arr[]) = maximum of all array elements.
Space Complexity:  O(1) as we are not using any extra space to solve this problem.

