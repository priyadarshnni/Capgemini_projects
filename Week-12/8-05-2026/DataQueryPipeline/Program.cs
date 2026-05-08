// PROGRAM.CS — Entry Point
// -------------------------
// Reads input, creates correct query type
// Executes query and displays result
//
// Input Format:
// Line 1 → queryType (Filter or Aggregate)
// Line 2 → space separated integers
// Line 3 → predicate or operation
//
// Sample Input:
// Filter
// 15 3 8 12 5 20 7
// >10
//
// Sample Output:
// Filter Executed,Predicate:>10,Result Count:3

using System;
using System.Collections.Generic;
using System.Linq;

namespace DataQueryPipeline
{
    class Program
    {
        static void Main(string[] args)
        {
            // Read query type from first line
            string queryType = Console.ReadLine().Trim();

            // Read data from second line and convert to List<int>
            string dataLine = Console.ReadLine().Trim();
            List<int> data = dataLine
                .Split(' ')
                .Select(int.Parse)
                .ToList();

            // Read predicate or operation from third line
            string predicateOrOperation = Console.ReadLine().Trim();

            // Create correct query type based on input
            if (queryType == "Filter")
            {
                // Create FilterQuery and execute
                FilterQuery filterQuery = new FilterQuery(data, predicateOrOperation);
                filterQuery.Execute();
            }
            else if (queryType == "Aggregate")
            {
                // Create AggregateQuery and execute
                AggregateQuery aggregateQuery = new AggregateQuery(data, predicateOrOperation);
                aggregateQuery.Execute();
            }
            else
            {
                Console.WriteLine("Invalid query type. Use Filter or Aggregate.");
            }
        }
    }
}
