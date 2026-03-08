# Count Subarray sum Equals K (TUF, Leetcode) 🟡

**Difficulty :** Medium

[Problem Link](https://leetcode.com/problems/subarray-sum-equals-k/description/)

## Problem Statement
Given an array of integers `nums` and an integer `k`, return *the total number of subarrays whose sum equals to* `k`.
A subarray is a contiguous non-empty sequence of elements within an array.
Example 1:
```
Input: nums = [1,1,1], k = 2
Output: 2
```
Example 2:
```
Input: nums = [1,2,3], k = 3
Output: 2
```

## Understanding 💡
it's different than other subarray questions, where we have return the length of the longest subarray with sum k. here, we have count the no. of subarray having the sum of k.

## Approach 🚀
**Brute Force :**
We will check the sum of every possible subarray and count how many of them are equal to k. To get every possible subarray sum, we will be using three nested loops. The first two loops(say i and j) will iterate over every possible starting index and ending index of a subarray. Basically, in each iteration, the subarray range will be from index i to index j. Using another loop we will get the sum of the elements of the subarray [i…..j]. Among all values of the sum calculated, we will only consider those that are equal to k.

Note: We are selecting every possible subarray using two nested loops and for each of them, we add all its elements using another loop.
1. First, we will run a loop(*say i*) that will select every possible starting index of the subarray. The possible starting indices can vary from index 0 to index n-1(n = size of the array).
2. Inside the loop, we will run another loop(say j) that will signify the ending index of the subarray. For every subarray starting from the index i, the possible ending index can vary from index i to n-1(n = size of the array).
3. After that for each subarray starting from index i and ending at index j (i.e. arr[i….j]), we will run another loop to calculate the sum of all the elements(of that particular subarray).
4. After calculating the sum, we will check if the sum is equal to the given k. If it is, we will increase the value of the count.

**Better Approach :**
If we carefully observe, we can notice that to get the sum of the current subarray we just need to add the current element(i.e. arr[j]) to the sum of the previous subarray i.e. arr[i….j-1]. 

Assume, 
previous subarray = arr[i……j-1]
current subarray = arr[i…..j]

Sum of arr[i….j] = (sum of arr[i….j-1]) + arr[j] This is how we can remove the third loop and while moving j pointer, we can calculate the sum.
1. First, we will run a loop(say i) that will select every possible starting index of the subarray. The possible starting indices can vary from index 0 to index n-1(n = array size).
2. Inside the loop, we will run another loop(say j) that will signify the ending index as well as the current element of the subarray. For every subarray starting from the index i, the possible ending index can vary from index i to n-1(n = size of the array).
3. Inside loop j, we will add the current element to the sum of the previous subarray i.e. sum = sum + arr[j].
4. After calculating the sum, we will check if the sum is equal to the given k. If it is, we will increase the value of the count.

**Optimal Approach :**
Now, *for a subarray ending at index i with the prefix sum x, if we remove the part with the prefix sum x-k, we will be left with the part whose sum is equal to k. And that is what we want.* Now, there may exist multiple subarrays with the prefix sum x-k. So, the number of subarrays with sum k that we can generate from the entire subarray ending at index i, is exactly equal to the number of subarrays with the prefix sum x-k, that we can remove from the entire subarray.

That is why, instead of searching the subarrays with sum k, we will keep the occurrence of the prefix sum of the subarrays using a map data structure.

In the map, we will store every prefix sum calculated, with its occurrence in a <key, value> pair. Now, at index i, we just need to check the map data structure to get the number of times that the subarrays with the prefix sum x-k occur. Then we will simply add that number to our answer.

We will apply the above process for all possible indices of the given array. The possible values of the index i can be from 0 to n-1(where n = size of the array)
1. First, we will declare a map to store the prefix sums and their counts.
2. Then, we will set the value of 0 as 1 on the map.
3. Then we will run a loop(say i) from index 0 to n-1(n = size of the array).
4. For each index i, we will do the following:1. We will add the current element i.e. arr[i] to the prefix sum.
2. We will calculate the prefix sum i.e. x-k, for which we need the occurrence.
3. We will add the occurrence of the prefix sum x-k i.e. mpp[x-k] to our answer.
4. Then we will store the current prefix sum in the map increasing its occurrence by 1.

## Code 🖥️

### Python
```python
from typing import List

def subarraySum(nums: List[int], k: int) -> int:
    n = len(nums)
    # print(n)
    if n == 0:
        return 0

    if n == 1 and k == nums[0]:
        return 1

    """
    Brute Force
    # select a range and calculate the sum
    # compare with k, and increase the counter
    """
    # counter = 0
    # for i in range(n):
    #     for j in range(i, n):
    #         subarray_sum = 0
    #         for x in range(i, j+1):
    #             subarray_sum+=nums[x]
    #
    #         if subarray_sum == k:
    #             counter+=1
    #             print(f"subarray #{counter} : i = {i}, j = {j}")
    #
    # return counter


    """
    Better Approach
    # instead of selecting a range
    # we keep add the element and keep checking the for sum==k
    # almost same as brute force approach
    # but save the time complexity
    """
    # counter = 0
    #
    # for i in range(n):
    #     subarray_sum = 0
    #     for j in range(i, n):
    #         subarray_sum+=nums[j]
    #         # print(f"subarray #{counter} : i = {i}, j = {j}, element = {nums[j]}, sum = {subarray_sum}")
    #
    #
    #         if subarray_sum == k:
    #             counter+=1
    #             # print(f"subarray #{counter} : i = {i}, j = {j}")
    #
    # return counter


    """
    Optimal Solution
    # uses T(n) = O(n) and S(n) = O(n)
    create a set where (sum:count) where sum is sum of an subarray
    and count is for how many time a subarray exist for a particular sum
    """

    # help_set = {0: 1}

    # subarray_sum = 0
    # counter = 0
    # for i in range(n):
    #     subarray_sum+=nums[i]

    #     remaining = subarray_sum-k

    #     if remaining in help_set:
    #         counter+=help_set[remaining]

    #     help_set[subarray_sum] = help_set.get(subarray_sum, 0) + 1


    # return counter


nums = [10, 5, 2, 7, 1, -10, -5]
# nums = [1,1,1]
k = 7

print(subarraySum(nums, k))
```

## Complexity Analysis ⏳

**Brute Force :**

- Time Complexity: O(N3), where N = size of the array.We are using three nested loops here. Though all are not running for exactly N times, the time complexity will be approximately O(N3).
- Space Complexity: O(1) as we are not using any extra space.

**Better Approach :**

- Time Complexity: O(n²),We use two nested loops to check all subarrays, where n is the size of the array.
- Space Complexity: O(1),Only a few extra variables are used, so constant extra space regardless of input size.****

**Optimal Approach :**

- Time Complexity: O(n) We traverse the array once, where n is the size of the array. Each prefix sum operation and hashmap lookup is O(1) on average.
- Space Complexity: O(n) In the worst case, all prefix sums are distinct and stored in the hashmap, so space grows linearly with input size.****



