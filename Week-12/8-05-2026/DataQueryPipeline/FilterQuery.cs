// DERIVED CLASS: FilterQuery
// ---------------------------
// Inherits from Query base class
// Filters data based on predicate string
// Predicate examples: ">10", "<5", "even"

using System;
using System.Collections.Generic;
using System.Linq;

namespace DataQueryPipeline
{
    public class FilterQuery : Query
    {
        // Filter condition string e.g. ">10", "<5", "even"
        public string predicate { get; set; }

        // Count of items after filtering
        public int filteredCount { get; set; }

        // Constructor — calls base constructor + sets predicate
        public FilterQuery(List<int> data, string predicate) : base(data)
        {
            this.predicate = predicate;
        }

        // Override Apply() — filters data based on predicate
        // Deferred execution — returns IEnumerable not List
        public override IEnumerable<int> Apply()
        {
            // Check predicate and apply correct filter
            if (predicate.StartsWith(">"))
            {
                // Greater than filter e.g. ">10"
                int value = int.Parse(predicate.Substring(1));
                return dataSource.Where(x => x > value);
            }
            else if (predicate.StartsWith("<"))
            {
                // Less than filter e.g. "<5"
                int value = int.Parse(predicate.Substring(1));
                return dataSource.Where(x => x < value);
            }
            else if (predicate.ToLower() == "even")
            {
                // Even numbers filter
                return dataSource.Where(x => x % 2 == 0);
            }
            else if (predicate.ToLower() == "odd")
            {
                // Odd numbers filter
                return dataSource.Where(x => x % 2 != 0);
            }
            else
            {
                // Default — return all data
                return dataSource;
            }
        }

        // Override Execute() — runs filter and displays result
        public override List<int> Execute()
        {
            isExecuted = true;
            var result = Apply().ToList();
            filteredCount = result.Count;

            // Display output in required format
            Console.WriteLine($"Filter Executed,Predicate:{predicate},Result Count:{filteredCount}");

            return result;
        }

        // Override GetQueryType()
        public override string GetQueryType()
        {
            return "Filter";
        }
    }
}
