using System;
using System.Collections.Generic;
using System.Linq;

class ProductPriceAnalyzer
{
    static void Main()
    {
        int[] prices = { 299, 499, 199, 399, 599, 159, 699, 259 };
        int target = 698;

        Console.WriteLine("--- Product Price Analysis ---\n");

        Console.WriteLine("Original Prices: " + string.Join(", ", prices));

        // 🔹 1. Bubble Sort
        int[] sorted = (int[])prices.Clone();
        for (int i = 0; i < sorted.Length - 1; i++)
        {
            for (int j = 0; j < sorted.Length - i - 1; j++)
            {
                if (sorted[j] > sorted[j + 1])
                {
                    int temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("\nSorted Prices (Ascending): " + string.Join(", ", sorted));

        // 🔹 2. Binary Search
        Console.WriteLine("\nBinary Search Results:");

        int index1 = BinarySearch(sorted, 399);
        Console.WriteLine(index1 != -1 ? $"Price 399 found at index {index1}" : "Price 399 not found");

        int index2 = BinarySearch(sorted, 500);
        Console.WriteLine(index2 != -1 ? $"Price 500 found at index {index2}" : "Price 500 not found");


        // 🔹 3. Pairs with Target Sum
        Console.WriteLine($"\nPairs that sum to {target}:");

        HashSet<int> set = new HashSet<int>();
        foreach (int price in prices)
        {
            int complement = target - price;
            if (set.Contains(complement))
            {
                Console.WriteLine($"({complement}, {price})");
            }
            set.Add(price);
        }

        // 🔹 4. Longest Increasing Subsequence (Simple DP)
        int n = prices.Length;
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (prices[i] > prices[j])
                {
                    dp[i] = Math.Max(dp[i], dp[j] + 1);
                }
            }
        }

        int maxLen = dp.Max();

        // Reconstruct LIS (simple way)
        List<int> lis = new List<int>();
        int last = int.MaxValue;

        for (int i = n - 1; i >= 0; i--)
        {
            if (dp[i] == maxLen && prices[i] < last)
            {
                lis.Add(prices[i]);
                last = prices[i];
                maxLen--;
            }
        }

        lis.Reverse();

        Console.WriteLine("\nLongest Increasing Subsequence:");
        Console.WriteLine(string.Join(", ", lis) + $" (Length: {lis.Count})");

        // 🔹 5. Statistics
        Console.WriteLine("\nStatistics:");

        int min = sorted.First();
        int max = sorted.Last();
        double avg = prices.Average();

        double median;
        if (sorted.Length % 2 == 0)
        {
            median = (sorted[sorted.Length / 2 - 1] + sorted[sorted.Length / 2]) / 2.0;
        }
        else
        {
            median = sorted[sorted.Length / 2];
        }

        Console.WriteLine($"Lowest Price: {min}");
        Console.WriteLine($"Highest Price: {max}");
        Console.WriteLine($"Average Price: {avg:F2}");
        Console.WriteLine($"Median Price: {median:F2}");
    }

    static int BinarySearch(int[] arr, int target)
    {
        int left = 0, right = arr.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }
}