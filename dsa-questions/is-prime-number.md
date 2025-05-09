# Check for Prime Number (Take U Forward) 🟢

**Difficulty:** Easy

[Problem Link](https://www.geeksforgeeks.org/problems/prime-number2314/1)

## Problem Statement

Check if the number is prime number or not.

## Understanding 💡

The basic understanding to check prime number if it is or not is that a number having only two factors and that too, 1 and the number itself.

Note : It's not that the number that is divisible by 1 and itself only is a prime number but a number having only two factors and not more than that.

ex : 17 can have only 1 and 17 as factors.

## Approach 🚀

**Basic Approach :\*\*\*\***

the basic approach is to run the loop till the number itself and keep an check if the number is divisible by any other number between 1 and the number and remainder is 0 then it's not an prime number.

**Optimised Approach :\*\*\*\***

we only go till the square root of that number because till then we will reach the number that will for sure divide it. and if not then it's a prime number.

*example* :

check if 36 is a prime number,

so instead of checking till 36, we will just check till square root of the 36 that is 6.

so 1, 2, 3, 4, 5, and 6. as we can see the there will be many factors. and we can say it's prime number.

and if want to check 17 is a prime number. square root will be 4 and something. but till 4 we can get if it's prime number.

## Code 🖥️

### Python

```python
import math

def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

num = 29
print("Prime" if is_prime(num) else "Not Prime")
```

### C++

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i <= sqrt(n); ++i)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int num = 29;
    cout << (isPrime(num) ? "Prime" : "Not Prime") << endl;
}
```

### Java

```java
public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        int num = 29;
        System.out.println(isPrime(num) ? "Prime" : "Not Prime");
    }
}
```

### JavaScript

```javascript
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

let num = 29;
console.log(isPrime(num) ? "Prime" : "Not Prime");
```

## Complexity Analysis ⏳

**Time Complexity :**
**Basic approach** : O(n)
**Optimised approach** : O(√n)

## Edge Cases 🔍

- n <= 1 | 0 and 1 are **not prime** by definition.
- n ==2  |  2 **is prime**, and it's the **only even prime number**.

- n == 3 | 3 is prime and should not be missed.

- n is a perfect square (e.g., 49, 121) | These can incorrectly pass naive checks if loop is up to < sqrt(n) instead of <= sqrt(n). Always **include** the square root in the loop.

- Negative numbers  |  All negative numbers are **not prime** by definition.

- Large values of n | Use long or long long (C++/Java) or Python's arbitrary integers; performance can matter at higher ranges (e.g., 10^6 or 10^9).
