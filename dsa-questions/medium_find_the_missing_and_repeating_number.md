# Find the Missing and Repeating Number (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1)

## Problem Statement
Given an unsorted array arr[] of size n, containing elements from the range 1 to n, it is known that one number in this range is missing, and another number occurs twice in the array, find both the duplicate number and the missing number.

Examples:
```
Input: arr[] = [2, 2]
Output: [2, 1]
Explanation: Repeating number is 2 and the missing number is 1.
```
```
Input: arr[] = [1, 3, 3]
Output: [3, 2]
Explanation: Repeating number is 3 and the missing number is 2.
```
```
Input: arr[] = [4, 3, 6, 2, 1, 1]
Output: [1, 5]
Explanation: Repeating number is 1 and the missing number is 5.
```

Constraints:
```
2 ≤ n ≤ 10^6
1 ≤ arr[i] ≤ n
```

## Understanding 💡
Get the duplicate and missing number from the array with size n.

## Approach 🚀
**Brute Force :**

- terate through the array from index 1 to N, where N is the size of the array.
- For each integer, i, use linear search to count its occurrence in the given array.
- If an element has an occurrence of 2, store it as a candidate element.
- If an element has an occurrence of 0, store it as another candidate element.
- Finally, return the two elements that have occurrences of 2 and 0, respectively.

**Better Approach :**

- Declare a hash array of size `N+1` where `N` is the range of numbers in the array (from 1 to N). This hash array will store the frequency of each element.
- Iterate through the given array and for each element encountered, update the frequency in the hash array.
- Once all elements are processed, iterate through the hash array and identify the two elements: one with frequency 2 and one with frequency 0.
- Return the two elements that have frequencies of 2 and 0, respectively.

**Optimal Approach : (mathematical approach)**

- First, calculate the sum of all elements in the given array, denoted as `S`, and the sum of natural numbers from 1 to N, denoted as `Sn`. The formula for `Sn` is `(N * (N + 1)) / 2`.
- Now calculate `S - Sn`. This gives us `X - Y`, where `X` is the repeating number and `Y` is the missing number.
- Next, calculate the sum of squares of all elements in the array, denoted as `S2`, and the sum of squares of the first N numbers, denoted as `S2n`. The formula for `S2n` is `(N * (N + 1) * (2N + 1)) / 6`.
- Now calculate `S2 - S2n`. This gives us `X2 - Y2`.
- From the equations `S - Sn = X - Y` and `S2 - S2n = X2 - Y2`, we can compute `X + Y` by the formula `(S2 - S2n) / (S - Sn)`.
- Using the values of `X + Y` and `X - Y`, we can solve for `X` and `Y` through simple addition and subtraction.
- Finally, return the values of `X` (the repeating number) and `Y` (the missing number).

**Optimal Approach : (xor method)**

- First, iterate through the array and calculate the XOR of all the elements in the array and the numbers from 1 to N. Store the result in a variable called `xr`.
- To find the position of the first set bit from the right, perform a bitwise AND operation between `xr` and the negation of `xr - 1`, i.e., `xr & ~(xr - 1)`. This will give the bit position of the first set bit.
- Initialize two variables, `zero` and `one`. For each element in the array and for each number from 1 to N, check the bit at the position found in the previous step.
- If the bit is 1, XOR the element with the variable `one`. If the bit is 0, XOR the element with the variable `zero`.
- After processing all the elements, you will have two variables, `zero` and `one`, which represent two numbers, one of which is the repeating number and the other is the missing number.
- To identify which is which, traverse the entire array and check how many times `zero` appears.
- If `zero` appears twice, it is the repeating number; otherwise, it is the missing number. Based on the identity of `zero`, determine which category `one` belongs to.

## Code 🖥️

### Python
```python
from typing import List


def find_missing_and_duplicate(arr:List[int]) -> List[int]:
    """
    # brute force approach
    keep a counter for each number
    if the counter is 2 then it's a repeating number
    and if the counter is 0 then it's a missing number
    but it will give timeout error if the array length is too big.
    """

    """
    # better approach
    keep the counter stored in hash array.
    and iterate through the array once
    and then iterate through hash array to check the count values
    """
    # n = len(arr)
    #
    # hash_array = [0] * (n+1)
    #
    # for ele in arr:
    #     hash_array[ele] += 1
    #
    # print(hash_array)
    #
    # missing = -1
    # repeating = -1
    #
    # for i in range(1,n+1):
    #     if hash_array[i] == 2:
    #         repeating = i
    #
    #     if hash_array[i] == 0:
    #         missing = i
    #
    # return [repeating, missing]

    """
    # optimal approach
    using sum and square of sum value
    mathematical solution
    """
    n = len(arr)
    missing = repeating = -1

    s = 0
    s2 = 0

    sn = n * (n + 1) // 2
    s2n = n * (n + 1) * (2 * n + 1) // 6

    for ele in arr:
        s += ele
        s2 += ele * ele

    val1 = s - sn
    val2 = s2 - s2n

    missing = ((val2 // val1) - val1) // 2
    repeating = (val2 // val1) - missing

    return [repeating, missing]


nums = [4,6,3,4,1,2]
# nums = [2,2]

print(find_missing_and_duplicate(nums))
```

## Complexity Analysis ⏳
**Brute Force Approach :**
- Time Complexity: O(N2), where N is the size of the array. This is because we are iterating through the array for each integer from 1 to N, leading to a nested loop.
- Space Complexity: O(1), as we are using a constant amount of space for the variables `repeating` and `missing`, regardless of the input size.

**Better Approach :**

- Time Complexity: O(2*N), where N is the size of the array. This is because we are iterating through the array once to build the hash array and then iterating through the hash array to find the repeating and missing numbers.
- Space Complexity: O(N), as we are using an additional hash array of size N+1 to store the frequency of each element.

**Optimal Approach :**

**Mathematical :**
- Time Complexity: O(N), where N is the size of the array. This is because we are iterating through the array to calculate the sums and sums of squares.
- Space Complexity: O(1), as we are using a constant amount of space for variables, regardless of the input size.

**XOR :**
- Time Complexity: O(N), where N is the size of the array. This is because we are iterating through the array to calculate the XOR values.
- Space Complexity: O(1), as we are using a constant amount of space for variables, regardless of the input size.

