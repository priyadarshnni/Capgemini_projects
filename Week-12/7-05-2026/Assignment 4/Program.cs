using System;
using System.Collections.Generic;
using System.Linq;

class SequencePatternDetector
{
    static void Main()
    {
        int[] arr = { 1, 3, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 10, 3 };
        int K = 2;

        Console.WriteLine("--- Access Pattern Analysis ---\n");

        // 🔹 1. Longest Consecutive Sequence
        HashSet<int> set = new HashSet<int>(arr);
        List<int> longestSeq = new List<int>();

        foreach (int num in set)
        {
            if (!set.Contains(num - 1)) // start of sequence
            {
                List<int> temp = new List<int>();
                int current = num;

                while (set.Contains(current))
                {
                    temp.Add(current);
                    current++;
                }

                if (temp.Count > longestSeq.Count)
                    longestSeq = temp;
            }
        }

        Console.WriteLine("Longest Consecutive Sequence: " +
            string.Join(",", longestSeq) + $" (Length: {longestSeq.Count})\n");


        // 🔹 2. Most Frequent Element
        Dictionary<int, int> freq = new Dictionary<int, int>();

        foreach (int num in arr)
        {
            if (freq.ContainsKey(num))
                freq[num]++;
            else
                freq[num] = 1;
        }

        var mostFreq = freq.OrderByDescending(x => x.Value).First();

        Console.WriteLine($"Most Frequent Element: {mostFreq.Key} (appears {mostFreq.Value} times)\n");


        // 🔹 3. First Non-Repeating Element
        int firstNonRepeat = -1;

        foreach (int num in arr)
        {
            if (freq[num] == 1)
            {
                firstNonRepeat = num;
                break;
            }
        }

        Console.WriteLine($"First Non-Repeating Element: {firstNonRepeat}\n");


        // 🔹 4. Pairs with Difference K
        Console.WriteLine($"Pairs with Difference {K}:");

        HashSet<int> pairSet = new HashSet<int>(arr);

        foreach (int num in pairSet)
        {
            if (pairSet.Contains(num + K))
            {
                Console.WriteLine($"({num}, {num + K})");
            }
        }

        Console.WriteLine();


        // 🔹 5. Majority Element (> n/2)
        int n = arr.Length;
        var majority = freq.FirstOrDefault(x => x.Value > n / 2);

        if (majority.Value > n / 2)
        {
            Console.WriteLine($"Majority Element: {majority.Key}");
        }
        else
        {
            double percent = (mostFreq.Value * 100.0) / n;
            Console.WriteLine($"Majority Element: {mostFreq.Key} (appears {mostFreq.Value} out of {n} times - {percent:F1}% - No majority)");
        }
    }
}