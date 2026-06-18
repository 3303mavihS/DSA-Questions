# Reverse Pairs (TUF, Leetcode) 🔴

**Difficulty:** Hard

[Problem Link](https://leetcode.com/problems/reverse-pairs/description/)

## Problem Statement
Given an integer array `nums`, return the number of reverse pairs in the array.
A reverse pair is a pair `(i, j)` where:
- `0 <= i < j < nums.length` and
- `nums[i] > 2 * nums[j]`.

Example 1:
```
Input: nums = [1,3,2,3,1]
Output: 2

Explanation: The reverse pairs are:
(1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
(3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1
```
Example 2:
```
Input: nums = [2,4,3,5,1]
Output: 3

Explanation: The reverse pairs are:
(1, 4) --> nums[1] = 4, nums[4] = 1, 4 > 2 * 1
(2, 4) --> nums[2] = 3, nums[4] = 1, 3 > 2 * 1
(3, 4) --> nums[3] = 5, nums[4] = 1, 5 > 2 * 1
```
Constraints:
```
1 <= nums.length <= 5 * 10^4
-231 <= nums[i] <= 231 - 1
```

## Understanding 💡
Returning the count of pair that satisfies `0 <= i < j < nums.length` and `nums[i] > 2 * nums[j]`. Almost similar as count inverse with a very minor differentiation.

## Approach 🚀
**Brute Force :**
1. First, we will run a loop(say i) from 0 to N-1 to select the a[i].
2. As index j should be greater than index i, inside loop i, we will run another loop i.e. j from i+1 to N-1, and select the element a[j].
3. Inside this second loop, we will check if `a[i] > 2*a[j]` i.e. if a[i] and a[j] can be a pair. If they satisfy the condition, we will increase the count by 1.
4. Finally, we will return the count i.e. the number of such pairs.

**Better/Optimal Approach :**

The steps are basically the same as they are in the case of the merge sort algorithm. The change will be just in the merge_sort() function:

- In order to count the number of pairs, we will keep a count variable, cnt, initialized to 0 beforehand inside the merge_sort().
- We will add the numbers returned by the previous merge_sort() calls.
- Before the merge step, we will count the number of pairs using a function, named count_pairs().
- We need to remember that the left half starts from low and ends at mid, and the right half starts from mid+1 and ends at high.

The steps of the count_pairs() function will be as follows:

1. We will declare a variable, cnt, initialized with 0.
2. We will run a loop from low to mid, to select an element at a time from the left half.
3. Inside that loop, we will use another loop to check how many elements from the right half can make a pair.
4. Lastly, we will add the total number of elements i.e. (right-(mid+1)) (where right = current index), to the cnt and return it.

## Code 🖥️

### Python
```python
from typing import List

def count_pairs(nums, low, mid, high):
    right = mid + 1
    cnt = 0

    for i in range(low, mid + 1):
        while right <= high and nums[i] > 2 * nums[right]:
            right += 1

        cnt += (right - (mid + 1))

    return cnt

def merge(nums, low, mid, high):
    temp = []
    left = low
    right = mid + 1

    while left <= mid and right <=high:
        if nums[left] <= nums[right]:
            temp.append(nums[left])
            left+=1
        else:
            temp.append(nums[right])
            right+=1

    while left <= mid:
        temp.append(nums[left])
        left += 1

    while right <= high:
        temp.append(nums[right])
        right += 1

    # transferring all elements from temporary to nums
    for i in range(low, high + 1):
        nums[i] = temp[i - low]

def merge_sort(nums, low, high):
    cnt = 0

    if low >= high:
        return cnt

    mid = (low + high) // 2
    cnt += merge_sort(nums, low, mid)
    cnt += merge_sort(nums, mid+1, high)
    cnt += count_pairs(nums, low, mid, high)
    merge(nums, low, mid, high)

    return cnt

def reverse_pairs(nums: List[int]) -> int:
    n = len(nums)

    if n == 0:
        return 0

    """
    # Brute Force
    count all the possible pair and check for the condition
    """
    # cnt = 0
    #
    # for i in range(n):
    #     for j in range(i+1,n):
    #         if nums[i] > 2 * nums[j]:
    #             cnt+=1
    #
    # return cnt


    """
    # Better/Optimal Approach
    using merge sort approach
    similar to count inversion
    a slight change in how to count
    """
    cnt = 0
    cnt += merge_sort(nums, 0, n-1)
    return cnt

nums = [1,3,2,3,1]

print(reverse_pairs(nums))
```

## Complexity Analysis ⏳
**Brute Force :**

- Time Complexity: `O(N^2)`, We are using nested loops here and those two loops roughly run for N times.
- Space Complexity: O(1), as we are not using any extra space to solve this problem.

**Better/Optimal Approach :**

- Time Complexity: `O(2N * logN)`, Inside the merge_sort() we call merge() and count_pairs() except merge_sort() itself. Now, inside the function count_pairs(), though we are running a nested loop, we are actually iterating the left half once and the right half once in total. That is why, the time complexity is O(N). And the merge() function also takes O(N). The merge_sort() takes O(logN) time complexity. Therefore, the overall time complexity will be `O(logN * (N+N)) = O(2N * logN)`.
- Space Complexity: O(N), as in the merge sort We use a temporary array to store elements in sorted order.

