using System;
using System.Collections.Generic;
using System.Linq;

class CustomerPreferenceAnalysis
{
    static void Main()
    {
        // Input (you can also take from console)
        string electronicsInput = "C001,C002,C003,C005,C008";
        string clothingInput = "C002,C004,C005,C006,C009";
        string booksInput = "C003,C005,C007,C008,C010";

        // Convert to HashSet
        HashSet<string> electronics = new HashSet<string>(electronicsInput.Split(','));
        HashSet<string> clothing = new HashSet<string>(clothingInput.Split(','));
        HashSet<string> books = new HashSet<string>(booksInput.Split(','));

        Console.WriteLine("--- Customer Preference Analysis ---\n");

        // 1. UNION (ANY category)
        var anyCategory = new HashSet<string>(electronics);
        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        Console.WriteLine("1. Customers in ANY category (Union):");
        Console.WriteLine(string.Join(", ", anyCategory));
        Console.WriteLine($"Total: {anyCategory.Count} customers\n");

        // 2. INTERSECTION (ALL categories)
        var allCategory = new HashSet<string>(electronics);
        allCategory.IntersectWith(clothing);
        allCategory.IntersectWith(books);

        Console.WriteLine("2. Customers in ALL categories (Intersection):");
        Console.WriteLine(string.Join(", ", allCategory));
        Console.WriteLine($"Total: {allCategory.Count} customer\n");

        // 3. ONLY Electronics
        var onlyElectronics = new HashSet<string>(electronics);
        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        Console.WriteLine("3. Customers ONLY in Electronics (Difference):");
        Console.WriteLine(string.Join(", ", onlyElectronics));
        Console.WriteLine($"Total: {onlyElectronics.Count} customers\n");

        // 4. Electronics AND Books but NOT Clothing
        var eAndB = new HashSet<string>(electronics);
        eAndB.IntersectWith(books);
        eAndB.ExceptWith(clothing);

        Console.WriteLine("4. Customers in Electronics AND Books but NOT Clothing:");
        Console.WriteLine(string.Join(", ", eAndB));
        Console.WriteLine($"Total: {eAndB.Count} customers");
    }
}