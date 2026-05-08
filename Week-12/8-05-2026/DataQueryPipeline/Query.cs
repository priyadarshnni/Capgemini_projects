// BASE CLASS: Query
// -----------------
// Acts as blueprint for all query types
// Contains common properties and virtual methods
// Virtual = child classes can override these methods

using System;
using System.Collections.Generic;
using System.Linq;

namespace DataQueryPipeline
{
    public class Query
    {
        // Original data source
        public List<int> dataSource { get; set; }

        // Tracks if query has been executed
        public bool isExecuted { get; set; } = false;

        // Constructor — sets data source
        public Query(List<int> data)
        {
            dataSource = data;
        }

        // Virtual = child classes can override this
        // Deferred execution — just prepares query, does not run it
        public virtual IEnumerable<int> Apply()
        {
            return dataSource;
        }

        // Forces execution — runs the query and returns result
        public virtual List<int> Execute()
        {
            isExecuted = true;
            return Apply().ToList();
        }

        // Returns type of query
        public virtual string GetQueryType()
        {
            return "Base Query";
        }
    }
}
