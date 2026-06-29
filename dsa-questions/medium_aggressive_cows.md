# Aggressive Cows (TUF, GeeksForGeeks) 🟡

**Difficulty:** Medium

[Problem Link](https://www.geeksforgeeks.org/problems/aggressive-cows/1)

## Problem Statement
You are given an array with unique elements of stalls[], which denote the positions of stalls. You are also given an integer k which denotes the number of aggressive cows. The task is to assign stalls to k cows such that the minimum distance between any two of them is the maximum possible.
Examples:
```
Input: stalls[] = [1, 2, 4, 8, 9], k = 3
Output: 3
Explanation: The first cow can be placed at stalls[0],
the second cow can be placed at stalls[2] and
the third cow can be placed at stalls[3].
The minimum distance between cows in this case is 3, which is the largest among all possible ways.
```
```
Input: stalls[] = [10, 1, 2, 7, 5], k = 3
Output: 4
Explanation: The first cow can be placed at stalls[0],
the second cow can be placed at stalls[1] and
the third cow can be placed at stalls[4].
The minimum distance between cows in this case is 4, which is the largest among all possible ways.
```
```
Input: stalls[] = [2, 12, 11, 3, 26, 7], k = 5
Output: 1
Explanation: There are 6 stalls and only 5 cows, we try to place the cows such that the minimum distance between any two cows is as large as possible.
The minimum distance between cows in this case is 1, which is the largest among all possible ways.
```
Constraints:
`2 ≤ stalls.size() ≤ 10^6`
`0 ≤ stalls[i] ≤ 10^8`
`2 ≤ k ≤ stalls.size()`

## Understanding 💡
we just need to return the max number of the distance between any two cows and we don't care about distance between other cows so basically distances between all the cows can be anything but we will return the maximum distance out of all those distances.

## Approach 🚀
We use Binary Search to optimize the solution by reducing the answer space in half each time.
*The main idea of Binary Search is to determine which half of the search space can be eliminated based on a specific condition, thus minimizing unnecessary checks.*
The answer space is sorted: 1 to the difference between max and min values. We can divide this space into two parts:
One containing valid answers.The other containing non-viable options.
Example: For stalls = {1, 2, 8, 4, 9}, the possible distances are shown below:

- Sort the stalls: Arrange the stalls in ascending order.
- Set the search range:
  - Start with the smallest possible distance.
  - The largest possible distance is the gap between the farthest and nearest stalls.
- Use Binary Search: Repeat the process until the search range is exhausted:
  - Pick the middle distance: Test this distance as a possible answer.
  - Check if it works:    
    - If it works: Try to increase the distance to see if a larger one is possible.
    - If it doesn’t work: Decrease the distance and test smaller ones.
- Return answer: After exiting the loop, `high` holds the largest valid distance.

## Code 🖥️

### Python
```python
class Solution:
    
    def placed_cows_with_dist(self, stalls, cows, dist):
        count_cows = 1
        last_placed = stalls[0]
    
        for i in range(1, len(stalls)):
    
            if stalls[i] - last_placed >= dist:
                count_cows += 1
                last_placed = stalls[i]
    
        return count_cows
        
        
    def aggressiveCows(self, stalls, k):
        """
        we just need to return the max number of the distance between any 
        two cows and we don't care about distance between other cows
        so basically distances between all the cows can be anything but we will
        return the maximum distance out of all those distances.
        """
        
        
        """
        first of all we need to try to place the cows with some distance
        and the distance between stalls can be calculated by 
        stall_2_pos - stall_1_pos and that means we need to sort the whole stalls
        array. 
        next try to place cow with some distance. and the distance that
        we are picking should have low end and the point till we can try.
        basically a range of distance that can exists to place all the cows.
        now this range of distance can be minimum 1 and the maximum value that
        exist in when only two cows needs to be placed and both goes to both ends.
        that means. max - min of the array.
        """
        
        """
        now we have the range and for brute force we use linear search
        loop through the range and try to place with each distance.
        and break the loop when we aren't able to do so.
        """
        
        """
        for optimal approach we apply the binary search on the range 
        and proceed with all the same thing.
        """
        
        # sort the array
        stalls.sort()
        
        low = 1
        high = max(stalls) - min(stalls)
        
        while low <= high:
            mid = low + (high - low) // 2
            
            cow_count = self.placed_cows_with_dist(stalls, k, mid)
            
            if cow_count >= k:
                low = mid + 1
            else:
                high = mid - 1
                
        return high
        

```

## Complexity Analysis ⏳
Time Complexity: `O(NlogN) + O(N * log(max(stalls[])-min(stalls[]))), where N = size of the array, max(stalls[])` = maximum element in stalls[] array, min(stalls[]) = minimum element in stalls[] array.
Space Complexity: `O(1)` as we are not using any extra space to solve this problem.

