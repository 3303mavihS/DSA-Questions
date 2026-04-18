# Majority Element II (TUF, Leetcode) 🔴

**Difficulty :** Hard

[Problem Link](https://leetcode.com/problems/majority-element-ii/description/)

## Problem Statement
Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.
Example 1:
```
Input: nums = [3,2,3]
Output: [3]
```
Example 2:
```
Input: nums = [1]
Output: [1]
```
Example 3:
```
Input: nums = [1,2]
Output: [1,2]
```

## Understanding 💡
Just like another version of this question where we need to find an element having more than n/2 times occurences. this question says to get the number(s) having occurence of minimum n/3 times.

**Can there be more than 2 majority elements?**

To understand why there can't be more than two majority elements (elements that appear more than n/3 times) in an array of size n, let's consider the following reasoning:
- A majority element must appear more than n/3 times. Let’s assume there are more than two majority elements, say A, B, and C.
- The combined frequency of these three elements would be: frequency of A + frequency of B + frequency of C > n/3 + n/3 + n/3 = n.
- Since the total occurrences of all elements cannot exceed n (the size of the array), the combined frequency of any three elements each appearing more than n/3 times would exceed the total size of the array, leading to a contradiction.
- Therefore, it is mathematically impossible to have more than two elements that each appear more than n/3 times in the array.


## Approach 🚀
**Brute Force Approach :**
- Iterate through the array and select each element one by one.
For each unique element, run another loop to count its occurrences in the array.
- If any element occurs more than floor(N/3) times, include it in the result array.
- If a previously included element is found during traversal, skip it to avoid counting duplicates.
- If the result array already contains 2 elements, break out of the loop, as there can’t be more than two majority elements.
Return the result array containing the majority elements or return -1 if no such element is found.

**Better Appoach :**
- Use a hashmap (or a frequency array if the array size is small) to store the elements as key-value pairs, where the key is the element and the value is the number of times it occurs in the array.
- Traverse the entire array, updating the occurrences of each element in the hashmap.
- After the traversal, check the hashmap to see if any element's value (frequency) is greater than the floor of N/3. If it is, include the element in the answer array.
- If the size of the answer array reaches 2, break out of the loop, as there cannot be more than two majority elements.
- Finally, return the answer array containing the majority elements. If no such elements are found, return -1.

**Optimal Approach :**
- Initialize four variables: `cnt1` and `cnt2` for tracking the counts of elements, and `el1` and `el2` for storing the potential majority elements.
- Traverse through the given array:
- After processing all elements, `el1` and `el2` should be the candidate elements for majority. To confirm:

## Code 🖥️

### Python
```python
from typing import List

def majorityElementsHard(nums : List[int]) -> List[int]:
    n = len(nums)
    min_occ = int(n/3 + 1)
    # print(f"min occurrence for majority : {min_occ}")

    ans_ls = []

    """
    Brute Force
    # check for each element and count its occurrence.
    # if equals to min_occ, push it to ans.
    # also we know max elements that can appear ⌊ n/3 ⌋ times is 2.
    # so we also keep a check on if the count of the ans_ls is 2 
    # we are good to break the loop
    """
    # for i in nums:
    #     if len(ans_ls) == 2:
    #         return ans_ls
    #
    #     if ans_ls and ans_ls[0] == i:
    #         continue
    #
    #     cnt = 0
    #
    #     for j in nums:
    #         if i == j:
    #             cnt+=1
    #
    #         if cnt == min_occ:
    #             ans_ls.append(i)
    #             break


    """
    Better Approach - using hashmap
    # we counter for each unique elements
    # and insert into the map as a key,value pair
    # and updating the counter value for each occurrences
    # loop the hashmap again to get the two elements having min_occ
    """
    # hash_mpp = {}
    #
    # for i in nums:
    #     # print(i)
    #     if hash_mpp.get(i):
    #         hash_mpp[i]+=1
    #     else:
    #         hash_mpp[i] = 1
    #
    #     if hash_mpp[i] >= min_occ and len(ans_ls) < 2:
    #         if len(ans_ls) == 0:
    #             ans_ls.append(i)
    #
    #         if i != ans_ls[0]:
    #             ans_ls.append(i)

    # print(hash_mpp)


    """
    Optimal Solution - Cancelling logic
    # take two elements and start the counter for them
    # every no that is different than these number
    # decrease the counter and once any of those hits 0
    # pick the next number abd start the count for it.
    # once we have those values
    # verify it once if they are the real answer
    """
    # ele1 = ele2 = float('-inf')
    # cnt1 = cnt2 = 0
    # 
    # for i in nums:
    #     if cnt1 == 0 and i != ele2:
    #         ele1 = i
    #         cnt1 = 1
    #     elif cnt2 == 0 and i != ele1:
    #         ele2 = i
    #         cnt2 = 1
    #     elif i == ele1:
    #         cnt1+=1
    #     elif i == ele2:
    #         cnt2+=1
    #     else:
    #         cnt1-=1
    #         cnt2-=1
    # 
    # cnt1 = cnt2 = 0
    # for i in nums:
    #     if i == ele1:
    #         cnt1+=1
    # 
    #     if i == ele2:
    #         cnt2+=1
    # 
    # if cnt1 >= min_occ:
    #     ans_ls.append(ele1)
    # 
    # if cnt2 >= min_occ:
    #     ans_ls.append(ele2)
    # 
    # ans_ls.sort()

    # print (ans_ls)
    return ans_ls




nums = [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5]
# nums = [1]
# nums = [3,2,3]
# nums = [1,2]
# nums = []

print(majorityElementsHard(nums))
```

## Complexity Analysis ⏳
**Brute Force :**
- Time Complexity: O(N^2), where N is the size of the array. This is because for each element, we are traversing the entire array to count its occurrences.
- Space Complexity: O(1), as we are using a constant amount of space for the result array, which can hold at most 2 elements.

**Better Approach :**
- Time Complexity: O(N * logN), where N is the size of the given array. For using a map data structure, where insertion in the map takes logN time, and we are doing it for N elements. So, it results in the first term O(N * logN). On using unordered_map instead, the first term will be O(N) for the best and average case, and for the worst case, it will be O(N2).
- Space Complexity: O(N) for using a map data structure. A list that stores a maximum of 2 elements is also used, but that space used is so small that it can be considered constant.****

**Optimal Approach :**
- Time Complexity: O(N), where N is the size of the input array. We traverse the array twice: once to find potential candidates and once to validate them.
- Space Complexity: O(1), as we are using a constant amount of space for the counters and candidate elements, regardless of the input size.

## Edge Cases 🔍
- ✔️ no such case.
