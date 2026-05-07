using System;
using System.Collections.Generic;
using System.Linq;

class SalesDataAggregator
{
    static void Main()
    {
        // Input
        List<(string product, string region, int amount)> sales = new List<(string, string, int)>
        {
            ("P001","North",1500),
            ("P001","South",2000),
            ("P002","North",3000),
            ("P001","East",2500),
            ("P002","South",1800),
            ("P003","North",1200),
            ("P001","West",2200),
            ("P002","West",2800),
            ("P003","South",900),
            ("P002","East",3200)
        };

        int threshold = 2000;

        Console.WriteLine("--- Sales Report by Product and Region ---\n");

        // 🔹 Group by Product
        var productGroup = sales.GroupBy(x => x.product);

        foreach (var product in productGroup)
        {
            Console.WriteLine($"Product {product.Key}:");

            var regionData = product.GroupBy(x => x.region);

            int total = 0;
            int count = 0;

            foreach (var region in regionData)
            {
                int sum = region.Sum(x => x.amount);
                Console.WriteLine($"  {region.Key}: ${sum}");

                total += sum;
                count++;
            }

            double avg = (double)total / count;
            Console.WriteLine($"  Total: ${total}, Average: ${avg:F2}\n");
        }

        // 🔹 Best Selling Product by Region
        Console.WriteLine("Best Selling Product by Region:");

        var regionGroup = sales.GroupBy(x => x.region);

        foreach (var region in regionGroup)
        {
            var best = region.OrderByDescending(x => x.amount).First();
            Console.WriteLine($"{region.Key}: {best.product} (${best.amount})");
        }

        // 🔹 Underperforming Products
        Console.WriteLine($"\nUnderperforming Products (< ${threshold} average):");

        foreach (var product in productGroup)
        {
            double avg = product.Average(x => x.amount);

            if (avg < threshold)
            {
                Console.WriteLine($"{product.Key} (${avg:F2})");
            }
        }
    }
}