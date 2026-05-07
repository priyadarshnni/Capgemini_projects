using System;
using System.Collections.Generic;

class WarehouseStockTracker
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        Dictionary<int, int> stock = new Dictionary<int, int>();

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();
            string[] parts = input.Split(' ');

            string operation = parts[0];

            if (operation == "ADD")
            {
                int productId = int.Parse(parts[1]);
                int qty = int.Parse(parts[2]);

                if (stock.ContainsKey(productId))
                    stock[productId] += qty;
                else
                    stock[productId] = qty;
            }

            else if (operation == "REMOVE")
            {
                int productId = int.Parse(parts[1]);
                int qty = int.Parse(parts[2]);

                if (stock.ContainsKey(productId))
                {
                    if (stock[productId] >= qty)
                        stock[productId] -= qty;
                    else
                        Console.WriteLine($"Cannot remove {qty} from Product {productId}");
                }
                else
                {
                    Console.WriteLine($"Product {productId} not found");
                }
            }

            else if (operation == "CHECK")
            {
                int productId = int.Parse(parts[1]);

                if (stock.ContainsKey(productId))
                    Console.WriteLine($"Product {productId}: {stock[productId]} units");
                else
                    Console.WriteLine($"Product {productId}: 0 units");
            }

            else if (operation == "BULK")
            {
                string[] items = parts[1].Split(',');

                foreach (var item in items)
                {
                    string[] pair = item.Split(':');
                    int productId = int.Parse(pair[0]);
                    int qty = int.Parse(pair[1]);

                    if (stock.ContainsKey(productId))
                        stock[productId] += qty;
                    else
                        stock[productId] = qty;
                }
            }

            else if (operation == "DISPLAY")
            {
                Console.WriteLine("--- Current Inventory ---");

                foreach (var item in stock)
                {
                    if (item.Value > 0)
                        Console.WriteLine($"{item.Key}: {item.Value} units");
                }
            }
        }
    }
}