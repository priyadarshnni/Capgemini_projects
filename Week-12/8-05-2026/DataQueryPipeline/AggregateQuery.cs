// DERIVED CLASS: AggregateQuery
// --------------------------------
// Inherits from Query base class
// Performs aggregation operations on data
// Operations: Sum, Average, Max, Min

using System;
using System.Collections.Generic;
using System.Linq;

namespace DataQueryPipeline
{
    public class AggregateQuery : Query
    {
        // Aggregation operation e.g. "Sum", "Average", "Max", "Min"
        public string operation { get; set; }

        // Result of aggregation
        public double result { get; set; }

        // Constructor — calls base constructor + sets operation
        public AggregateQuery(List<int> data, string operation) : base(data)
        {
            this.operation = operation;
        }

        // Override Apply() — prepares aggregation without executing
        // Returns original data source (deferred)
        public override IEnumerable<int> Apply()
        {
            return dataSource;
        }

        // Override Execute() — runs aggregation and displays result
        public override List<int> Execute()
        {
            isExecuted = true;

            // Perform aggregation based on operation type
            switch (operation.ToLower())
            {
                case "sum":
                    result = dataSource.Sum();
                    break;

                case "average":
                    result = dataSource.Average();
                    break;

                case "max":
                    result = dataSource.Max();
                    break;

                case "min":
                    result = dataSource.Min();
                    break;

                default:
                    result = 0;
                    break;
            }

            // Display output in required format
            Console.WriteLine($"Aggregation Executed,Operation:{operation},Result:{result}");

            return dataSource;
        }

        // Override GetQueryType()
        public override string GetQueryType()
        {
            return "Aggregate";
        }
    }
}
