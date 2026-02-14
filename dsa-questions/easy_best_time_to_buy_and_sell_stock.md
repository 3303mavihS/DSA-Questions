# Best Time to Buy and Sell Stock (TUF, Leetcode) 🟢

**Difficulty :** Easy

[Problem Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)

## Problem Statement
You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

**Example 1 :**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```
**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

## Understanding 💡
Need to figure out buy day and sell day according to price to get the maximum profit. it's possible that the buying price is not the minimum value out of all that means a pair of values where the difference is maximum. The prices are given as the day goes by. that means whatever the value is for buying the max value for sell comes after buying price.

## Approach 🚀
**Brute Force :** We try every possible pair of days (buy day and sell day after buy) and calculate the profit. The maximum profit among all these pairs is our answer. If no profit is possible, return 0.- Loop through all days to consider each as a possible buy day.
- For each buy day, loop through all future days to consider them as sell days.
- Calculate the profit for each (buy, sell) pair.
- Track the maximum profit seen.

**Optimal Way :**
 The idea is to track the minimum price so far while traversing the array and calculate the profit if we sold today. This way, we can constantly update the maximum profit without using nested loops. We’re basically simulating:- What’s the lowest price we’ve seen so far?
- What’s the profit if we sold today?
- Is it better than our best so far?
- Initialize a variable to store the minimum price so far, set it to a very large value initially.
- Initialize a variable to store the maximum profit seen so far, set it to 0 initially.
- Loop through each price in the array.
- Update the minimum price if the current price is smaller.
- Calculate the profit if the stock were bought at the minimum price and sold at the current price.
- Update the maximum profit if this new profit is higher.
- Return the maximum profit after the loop ends.

## Code 🖥️

### Python
```python
from typing import List

def maxProfit(prices: List[int]) -> int:
    # print(prices)

    n = len(prices)

    """
    Brute Force
    # select a subarray first and then
    # we get a min value from the subarray first.
    # and get the max value from min value index to subarray end index
    # Time complexity is O(n^3) and space complexity is O(1)
    # and this approach will not work for large n where n is 100000
    # function will take too much time to execute
    """
    # profit = 0
    # for i in range(n):
    #     for j in range(i,n):
    #         if i == 0 and j == 0:
    #             continue
    #
    #         min_price = min(prices[i:j+1])
    #         min_price_index = prices.index(min_price)
    #         max_price = max(prices[min_price_index:j+1])
    #
    #         profit = max(profit, max_price - min_price)
    #
    # return profit

    """
    Better approach
    # we use every possible pair of prices and calculate the profit for each pair and get the max profit
    # Time complexity is O(n^2) and space complexity is O(1)
    # and this approach will not work for large n where n is 100000
    # function will take too much time to execute
    """
    # profit = 0
    # for i in range(n):
    #     for j in range (i+1, n):
    #         if prices[i] >= prices[j]:
    #             continue

    #         profit = max(profit, prices[j] - prices[i])
    
    # return profit


    """
    Optimal Approach
    # we need to know min price on it's left for each element
    # get the values and get the profit and calculate the max profit.
    """
    # profit = 0
    # min_price = prices[0]
    # for i in range(1,n):
    #     cost = prices[i] - min_price
    #     profit = max(profit, cost)
    #     min_price = min(min_price, prices[i])
    # 
    # return profit


prices = [7, 1, 5, 3, 6, 4]
# prices = [2, 4, 1]
print(maxProfit(prices))
```

## Complexity Analysis ⏳
**Brute Force:**

- Time Complexity : O(n²) Because for each element, we are checking every future element nested loops.
- Space Complexity: O(1) No extra space used, only variables for storing max profit.

**Optimal Approach :**
- Time Complexity: O(n),This is because we are iterating through the array of prices exactly once. There are no nested loops or recursive calls.
- Space Complexity: O(1),Only two variables are used to store the minimum price and maximum profit, regardless of the input size.

## Edge Cases 🔍
- Take care of the large input length values. using n^2 approach will take too much time for execution.
