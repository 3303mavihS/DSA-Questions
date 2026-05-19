# Count the number of subarrays with given xor K (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1)

## Problem Statement
Given an array of integers arr[] and a number k, count the number of subarrays having XOR of their elements as k.
Note: It is guranteed that the total count will fit within a 32-bit integer.
Examples:
```
Input: arr[] = [4, 2, 2, 6, 4], k = 6
Output: 4
Explanation: The subarrays having XOR of their elements as 6 are [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], and [6]. Hence, the answer is 4.
```
```
Input: arr[] = [5, 6, 7, 8, 9], k = 5
Output: 2
Explanation: The subarrays having XOR of their elements as 5 are [5] and [5, 6, 7, 8, 9]. Hence, the answer is 2.
```
```
Input: arr[] = [1, 1, 1, 1], k = 0
Output: 4
Explanation: The subarrays are [1, 1], [1, 1], [1, 1] and [1, 1, 1, 1].
```
Constraints:
```
1 ≤ arr.size() ≤ 105
0 ≤ arr[i] ≤ 105
0 ≤ k ≤ 105
```

## Understanding 💡
return the number of subarrays where when their xor will be calculate then xor should be equal to the given k.

## Approach 🚀
**Brute Force Approach**

We to find the total number of subarrays (continuous segments of the array) such that the XOR of all elements in that subarray equals B. A brute force way would be to consider every possible subarray of the array and check its XOR.
- Initialize a counter to 0 for storing the number of valid subarrays.
- Loop through each index i as the starting point of the subarray.
- Set a variable xor = 0 for maintaining the running XOR of the current subarray.
- Loop through each index j from i to n-1 to extend the subarray.
- Update xor by taking xor = xor ^ A[j].
- If xor equals B, increment the counter by 1.
- After all iterations, return the counter as the total number of subarrays.


**Better/Optimal Approach**

The brute force approach checks all possible subarrays and computes their XOR, but this quickly becomes inefficient for large arrays because it requires checking every pair of indices. Instead, we can make use of prefix XORs. A prefix XOR at index i represents the XOR of all elements from the start up to i. Using this, the XOR of any subarray can be derived by taking the XOR of two prefix XOR values.
Now, to find whether a subarray ending at the current position has XOR equal to k, we only need to check if there was an earlier prefix XOR such that when we combine it with the current prefix XOR, the result is k. In other words, the condition becomes prefixXor[r] ^ prefixXor[l-1] = k.
We keep track of how many times each prefix XOR has appeared using a hashmap (or dictionary). Whenever we find one that matches, we increase our count. This way, instead of checking all subarrays, we just use the hashmap and solve it much faster.
- Initialize a hashmap to store how many times each prefix XOR has appeared.
- Keep a variable to store the current prefix XOR as we move through the array.
- Keep another variable to count the total number of subarrays with XOR equal to k.
- For each element in the array, update the prefix XOR by combining it with the current element.
- If the prefix XOR itself is equal to k, increase the count by one.
- Check if there exists a prefix XOR seen before that can make the subarray XOR equal to k, and if yes, add its frequency from the hashmap to the count.
- Store or update the frequency of the current prefix XOR in the hashmap.
- After processing all elements, the count will be the total number of subarrays with XOR equal to k.

## Code 🖥️

### Python
```python
#Optimal Approach Solution
class Solution:
    def subarrayXor(self, arr, k):
        """
        brute force
        calculating all the subarrays with the xor k
        and keeping the count for the matches
        """
        
        """
        better/optimal approach
        using hashmap and prefix sum approach
        """
        count = 0
        hashmp = {0: 1} #count 0 should also be initialized
        pre_xor = 0
        
        for i in range(len(arr)):
            # calculate the xor
            pre_xor ^= arr[i]
            
            # Compute required XOR
            target = pre_xor ^ k
                
            # If target exists in map, add its frequency
            if target in hashmp:
                count+=hashmp[target]
            
            # Store current prefix XOR in map
            hashmp[pre_xor] = hashmp.get(pre_xor,0) + 1 
        
        return count


#Brute force code

class Solution:
    # Function to count subarrays with given XOR
    def countSubarrays(self, A, k):
        # Store frequency of prefix XORs
        freq = {0: 1}
        
        # Current prefix XOR
        prefixXor = 0
        # Answer count
        count = 0

        # Traverse array
        for num in A:
            # Update prefix XOR
            prefixXor ^= num

            # Compute required XOR
            target = prefixXor ^ k

            # If target exists in map, add its frequency
            if target in freq:
                count += freq[target]

            # Store current prefix XOR in map
            freq[prefixXor] = freq.get(prefixXor, 0) + 1

        return count


# Driver code
A = [4, 2, 2, 6, 4]
k = 6
sol = Solution()
print(sol.countSubarrays(A, k))

        
```

## Complexity Analysis ⏳
**Brute Force**

- Time Complexity: O(N^2), we generate all possible subarrays to check their XOR.
- Space Complexity: O(1) , constant amount of extra space is used.

**Better/Optimal**

- Time Complexity: O(N), we traverse the entire array once to calculate prefix XOR and subarrays with given XOR.
- Space Complexity: O(N) , additional amount of extra space is used to store frequencies of prefix XOR in hash map.

