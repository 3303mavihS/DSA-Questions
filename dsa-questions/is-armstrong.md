# Check if a number is Armstrong Number or not (TakeUForward) 🔢

[Problem Link](https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1)

## Problem Statement

Given an integer N, return true it is an Armstrong number otherwise return false. An Amrstrong number is a number that is equal to the sum of its own digits each raised to the power of the number of digits.

## Understanding 💡

To check if it's an Armstrong number, you need to:- **Count the number of digits:** In 153, there are 3 digits.
**Raise each digit to the power of the number of digits:**

- 1^3=1
- 5^3= 125
- 3^3= 27

**Sum these results:** 1+125+27=153
**Compare the sum to the original number:** Since the sum (153) is equal to the original number (153), 153 is an Armstrong number.

Let's take another example, say 121:
**Count digits:** 3 digits.
**Raise each digit to the power of 3:**

- 1^3=1
- 2^3=8
- 1^3=1

**Sum the results:** 1+8+1=10
**Compare:** 10 is not equal to 121, so 121 is not an Armstrong number.

## Approach 🚀

As We have understood the what armstrong number is we just need to do it step by step:- Handle Edge Cases

- Count the Number of Digits. And one way to do this is to repeatedly divide the number by 10 until it becomes 0, and keep a counter
- Or, convert the number to a string and get its length.
- Calculate the Sum of Digits Raised to the Power
- Initialize a variable, say `sum_of_powers`, to 0.
- Create a temporary copy of the original number `N` to work with, so you don't modify the original number.
- While the temporary number is greater than 0
- Extract the last digit of the temporary number using the modulo operator (`% 10`).
- Raise this digit to the power of the digit count
- Add the result to `sum_of_powers`.
- Remove the last digit from the temporary number by integer division by 10 (`// 10` in Python, `/ 10` in Java/JavaScript).
- Compare the Sum with the Original Number
- If `sum_of_powers` is equal to `N`, then `N` is an Armstrong number, and you should return `true`.
- Otherwise, `N` is not an Armstrong number, and you should return `false`.

## Code 🖥️

### C++

```cpp
#include <iostream>
#include <cmath> // Required for pow()

using namespace std;

bool isArmstrong(int num) {
    // Count the number of digits
    int count = 0;
    int temp_num = num;

    while (temp_num > 0) { // Fixing the condition
        temp_num = temp_num / 10;
        count++;
    }

    // Calculate sum of digits raised to the power of count
    int sum = 0;
    int check_num = num; // Added missing semicolon

    while (check_num > 0) { // Fixing the condition
        int digit = check_num % 10;
        sum += pow(digit, count); // Use pow() from <cmath>
        check_num = check_num / 10;
    }

    // Compare sum with original number
    return sum == num;
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;

    if (isArmstrong(num)) {
        cout << num << " is an Armstrong number." << endl;
    } else {
        cout << num << " is not an Armstrong number." << endl;
    }

    return 0;
}
```

### Python

```python
def is_armstrong(num):
    """
    Checks if a number is an Armstrong number.

    Args:
        num: The integer to check.

    Returns:
        True if the number is an Armstrong number, False otherwise.
    """
    # Convert number to string to easily count digits and iterate
    s_num = str(num)
    n = len(s_num)
    sum_of_powers = 0
    for digit in s_num:
        sum_of_powers += int(digit) ** n
    return sum_of_powers == num

if __name__ == "__main__":
    try:
        number = int(input("Enter a number: "))
        if is_armstrong(number):
            print(f"{number} is an Armstrong number.")
        else:
            print(f"{number} is not an Armstrong number.")
    except ValueError:
        print("Invalid input. Please enter an integer.")
```

### Java

```java
import java.lang.Math;
import java.util.Scanner;

public class ArmstrongNumber {

    public static boolean isArmstrong(int num) {
        String sNum = Integer.toString(num);
        int n = sNum.length();
        int sumOfPowers = 0;
        int tempNum = num;

        while (tempNum > 0) {
            int digit = tempNum % 10;
            sumOfPowers += Math.pow(digit, n);
            tempNum /= 10;
        }
        return sumOfPowers == num;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        try {
            int number = scanner.nextInt();
            if (isArmstrong(number)) {
                System.out.println(number + " is an Armstrong number.");
            } else {
                System.out.println(number + " is not an Armstrong number.");
            }
        } catch (java.util.InputMismatchException e) {
            System.out.println("Invalid input. Please enter an integer.");
        } finally {
            scanner.close();
        }
    }
}
```

### JavaScript

```javascript
function isArmstrong(num) {
  // Convert number to string to easily count digits and iterate
  const sNum = String(num);
  const n = sNum.length;
  let sumOfPowers = 0;
  for (let i = 0; i < n; i++) {
    sumOfPowers += Math.pow(parseInt(sNum[i]), n);
  }
  return sumOfPowers === num;
}

function main() {
  const input = prompt("Enter a number:");
  const number = parseInt(input);

  if (!isNaN(number)) {
    if (isArmstrong(number)) {
      console.log(`${number} is an Armstrong number.`);
    } else {
      console.log(`${number} is not an Armstrong number.`);
    }
  } else {
    console.log("Invalid input. Please enter an integer.");
  }
}

main();
```

## Complexity Analysis ⏳

**Time Complexity:** Typically dominated by the calculation of the sum of powers. It's generally in the order of O((logN)^2) if a naive power function is used, and can be closer to O(logN⋅log(logN)) with an efficient power function.
**Space Complexity:** Primarily O(1) as we use a constant amount of extra space for variables, especially if we avoid converting the number to a string for counting digits.

## Edge Cases 🔍

- Negative Numbers
- Zero (0)
- Single-Digit Positive Numbers (1-9)
- Numbers with Leading Zeros (If Input is a String)
- Very Large Numbers (Potential for Overflow)
- Input Type Validation (If Applicable)
