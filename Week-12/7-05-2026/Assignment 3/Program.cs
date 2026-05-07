using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

class WordFrequencyAnalyzer
{
    static void Main()
    {
        // Sample input
        string text = "The quick brown fox jumps over the lazy dog. The fox is quick and the dog is lazy. Quick brown fox jumps over the lazy dog again.";
        int N = 3;

        // Step 1: Convert to lowercase
        text = text.ToLower();

        // Step 2: Remove punctuation
        text = Regex.Replace(text, @"[^\w\s]", "");

        // Step 3: Split into words
        string[] words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        // Step 4: Count frequency using Dictionary
        Dictionary<string, int> freq = new Dictionary<string, int>();

        foreach (var word in words)
        {
            if (freq.ContainsKey(word))
                freq[word]++;
            else
                freq[word] = 1;
        }

        Console.WriteLine("--- Word Frequency Analysis ---\n");

        // Total words
        Console.WriteLine($"Total words: {words.Length}");

        // Unique words
        Console.WriteLine($"Unique words: {freq.Count}\n");

        // Top N frequent words
        Console.WriteLine($"Top {N} Frequent Words:");
        var topWords = freq.OrderByDescending(x => x.Value).Take(N);

        foreach (var item in topWords)
        {
            Console.WriteLine($"{item.Key}: {item.Value} times");
        }

        // Words appearing exactly once
        Console.WriteLine("\nWords appearing exactly once:");
        var onceWords = freq.Where(x => x.Value == 1).Select(x => x.Key);

        Console.WriteLine(string.Join(", ", onceWords));

        // Average frequency
        double avg = freq.Values.Average();
        Console.WriteLine($"\nAverage frequency: {avg:F2} times per unique word");
    }
}