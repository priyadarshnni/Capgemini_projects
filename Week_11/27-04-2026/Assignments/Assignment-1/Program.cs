using System;
using System.Collections.Generic;
namespace Assignment
{
    class Program
    {
        static int SumOfDigits(int n)
        {
            int sum = 0;
            while(n > 0)
            {
                int digit = n % 10;
                sum += digit;
                n = n/10;
            }
            return sum;
        }


        static bool IsPalindrome(string s)
        {
            int left = 0, right = s.Length - 1;
            while (left < right)
            {
                if (s[left] != s[right])
                    return false;
                left++;
                right--;
            }
            return true;
        }


        static void FizzBuzz(int n)
        {
            for (int i = 1; i <= n; i++)
            {
                if (i % 3 == 0 && i % 5 == 0)
                    Console.WriteLine("FizzBuzz");
                else if (i % 3 == 0)
                    Console.WriteLine("Fizz");
                else if (i % 5 == 0)
                    Console.WriteLine("Buzz");
                else
                    Console.WriteLine(i);
            }
        }


        static int[] TwoSum(int[] nums, int target)
        {
            Dictionary<int, int> map = new Dictionary<int, int>();
            for (int i = 0; i < nums.Length; i++)
            {
                int complement = target - nums[i];
                if (map.ContainsKey(complement))
                    return new int[] { map[complement], i };
                map[nums[i]] = i;
            }
            return new int[] { -1, -1 };  // This shouldn't happen if a solution exists
        }


        static int FindMissingNumber(int[] arr)
        {
            int n = arr.Length + 1;
            int totalSum = n * (n + 1) / 2;
            int arrSum = 0;
            
            foreach (int num in arr)
                arrSum += num;
            return totalSum - arrSum;
        }


        static int[] MergeSortedArrays(int[] arr1, int[] arr2)
        {
            int[] result = new int[arr1.Length + arr2.Length];
            int i = 0, j = 0, k = 0;
            while (i < arr1.Length && j < arr2.Length)
            {
                if (arr1[i] < arr2[j])
                    result[k++] = arr1[i++];
                else
                    result[k++] = arr2[j++];
            }
            while (i < arr1.Length)
                result[k++] = arr1[i++];
            while (j < arr2.Length)
                result[k++] = arr2[j++];
            return result;
        }


        static void Main(string[] args)
        {
            int n = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(SumOfDigits(n));


            string s = Console.ReadLine();
            Console.WriteLine(IsPalindrome(s) ? "True" : "False");


            int n = int.Parse(Console.ReadLine());
            FizzBuzz(n);


            int target = int.Parse(Console.ReadLine());
            int[] nums = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
            int[] result = TwoSum(nums, target);
            Console.WriteLine($"[{result[0]}, {result[1]}]");


            int[] arr = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
            Console.WriteLine(FindMissingNumber(arr));


            int[] arr1 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
            int[] arr2 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
            int[] mergedArray = MergeSortedArrays(arr1, arr2);
            Console.WriteLine(string.Join(" ", mergedArray));
        }
    }
}
