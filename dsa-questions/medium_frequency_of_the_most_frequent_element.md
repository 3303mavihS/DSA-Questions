# Frequency of the Most Frequent Element (Leetcode) 🟡

**Difficulty:** Medium

[Problem Link](https://leetcode.com/problems/frequency-of-the-most-frequent-element)

## Problem Statement
The frequency of an element is the number of times it occurs in an array. You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1. Return the maximum possible frequency of an element after performing at most k operations.
**Example 1 :**
Input : nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
**Example 2 :**
Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: There are multiple optimal solutions:
- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.

## Understanding 💡
We have to get a number that can be made most as frequency with the give no. of operation as *k*. That means we take a number and try to make a number that is already in the array by using some numbers from the *k* itself.

## Approach 🚀
I preferably use hashing and just increase the value of the key in map. and just iterate through it to get the highest value for the key. And we can do it by performing some operation. 
**Step 1 :**
sort the array. so that we can start from last.
**Step 2 :**
we will just set a number and try remaining numbers to make it as the set number. by using the operations from *k*.
**Step 3 :**
this process is done from every number by keeping it target number and for each number we will go backwards. that means we will only use preceding numbers and not the next numbers.
**Step 4 :**
if we can get a preceding number as target number we increase the value of the number in map.
**Step 5 :**
basically we'll have a map that have the highest numbers that can be made with the k operations.
**Step 6 :**
iterate through the map and return the highest value number

## Code 🖥️

### C++
```cpp
 int maxFrequency(vector<int>& nums, int k) {
        
    //first sort the array or vector
    sort(nums.begin(),nums.end());
    //create a map to keep the frequencies of each no.
    map<int,int> mpp;
    //size of the vector
    int last = nums.size()-1;

    for(int i=last;i>=0;i--){
        int remaining_op = k;
        int j = i;
        while(remaining_op>0&&j>=0){
            int diff = nums[i]-nums[j];
            if(remaining_op>=diff){
                mpp[nums[i]]++;
                remaining_op = remaining_op-diff;
            }
            j--;
        }            
    }  

    int maxFrequency = 0;

    std::map<int, int>::reverse_iterator rit;
    for (rit = mpp.rbegin(); rit != mpp.rend(); ++rit) {
        // Access the frequency using rit->second
        if (rit->second > maxFrequency) {
            maxFrequency = rit->second;
        }
    }

    return maxFrequency;
}
```

## Complexity Analysis ⏳
- `sort(nums)` → **O(n log n)**
- Outer loop runs `n` times (`for i = last to 0`)
- Inner loop can run up to `i` times in worst case
- → So overall, **O(n²)** in worst case due to nested loop
- Map insertion and traversal → **O(n)**

## Edge Cases 🔍
- Empty array: nums = [], k = 5
- Single element: nums = [4], k = 100
- All elements equal: nums = [3, 3, 3], k = 0
- All elements different, small k: nums = [1, 2, 3], k = 1
- All elements same, but k is nonzero: nums = [5, 5, 5], k = 10
- Large k allows full equalization: nums = [1, 2, 4], k = 5
- Already sorted in descending order: nums = [9, 8, 7], k = 3
- No operations allowed (k = 0): nums = [1, 2, 2, 3], k = 0
- High value difference with large k: nums = [1, 100000], k = 99999
- Mix of duplicates and unique values with medium k: nums = [1, 2, 2, 3, 4], k = 5
