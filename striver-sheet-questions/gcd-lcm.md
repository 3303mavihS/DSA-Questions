# GCD & LCM of Two Numbers (LeetCode) 🔢

## Problem Statement

Given two integers a and b, find their Greatest Common Divisor (GCD). The GCD of two numbers is the largest positive integer that divides both a and b without leaving a remainder.

## Understanding 💡

Explanation of GCD (Greatest Common Divisor)

The GCD of two numbers is the largest number that can divide both numbers without leaving a remainder.

Example of GCD Calculation

Let's say A = 36, B = 24. The divisors of each number are:

36: {1, 2, 3, 4, 6, 9, 12, 18, 36}

24: {1, 2, 3, 4, 6, 8, 12, 24}

The common divisors are {1, 2, 3, 4, 6, 12}, and the greatest one is 12.
So, GCD(36, 24) = 12.

Euclidean Algorithm for GCD

The Euclidean algorithm finds GCD efficiently using the property:

GCD(A, B) = GCD(B, A % B)

If
B = 0, return

A.

Otherwise, keep applying the formula recursively.

Example: GCD(36, 24)

GCD(36, 24) → GCD(24, 36 % 24) → GCD(24, 12)

GCD(24, 12) → GCD(12, 24 % 12) → GCD(12, 0)

GCD(12, 0) → return 12

So, GCD = 12.

Explanation of LCM (Least Common Multiple)

The LCM of two numbers is the smallest number that both numbers divide evenly into.

Example of LCM Calculation

For A = 36, B = 24, the multiples are:

Multiples of 36: {36, 72, 108, 144, …}

Multiples of 24: {24, 48, 72, 96, …}

The smallest common multiple is 72, so LCM(36, 24) = 72.

Formula for LCM using GCD

Instead of listing multiples, we use:

LCM(A, B) = A × B / GCD(A, B)​

For A = 36, B = 24:

LCM(36, 24) = 36 × 24 / 12 ​= 72

## Approach 🚀

One simple method is to start from the minimum of a and b, and check divisibility going downwards. But this is inefficient.

A better approach is to use the Euclidean algorithm, which is based on the principle that gcd(a, b) = gcd(b, a % b).

We repeat this process until b becomes 0. At that point, a will be the GCD.

## Code 🖥️

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    // Function to calculate GCD using the basic method
    long long gcd(long long A, long long B) {
        while (B != 0) {
            long long temp = B;
            B = A % B;
            A = temp;
        }
        return A;
    }

    // Function to calculate LCM and GCD
    void lcmAndGcd(long long A, long long B) {
        long long gcdValue = gcd(A, B);
        long long lcmValue = (A * B) / gcdValue;  // Formula for LCM

        cout << "LCM: " << lcmValue << ", GCD: " << gcdValue << endl;
    }
};

int main() {
    Solution obj;
    long long A, B;
    cout << "Enter two numbers: ";
    cin >> A >> B;

    obj.lcmAndGcd(A, B);

    return 0;
}
```

## Complexity Analysis ⏳

**Time Complexity:** O(log(min(a, b))) time, O(1) space  
**Space Complexity:** O(log(min(a, b))) time, O(1) space

## Edge Cases 🔍

✔️ ✔️ a and b are equal ✔️ a is 0 ✔️ b is 0 ✔️ a or b is negative ✔️ very large numbers
