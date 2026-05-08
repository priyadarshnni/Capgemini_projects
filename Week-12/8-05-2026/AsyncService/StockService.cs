// DERIVED CLASS: StockService
// -----------------------------
// Inherits from AsyncService
// Fetches stock price for a symbol
// Simulates async delay of 2 seconds

using System;
using System.Threading.Tasks;

namespace AsyncServiceOrchestration
{
    public class StockService : AsyncService
    {
        // Stock ticker symbol e.g. AAPL, TSLA
        public string symbol { get; set; }

        // Current stock price
        public double currentPrice { get; set; }

        // Constructor — sets symbol and default price
        public StockService(string symbol)
        {
            this.symbol = symbol;
            this.currentPrice = 150.75; // default price
        }

        // Override FetchDataAsync
        // Step 1: Display fetch started
        // Step 2: Wait 2 seconds (simulate API call)
        // Step 3: Display stock price update
        public override async Task<string> FetchDataAsync(string endpoint)
        {
            requestCount++;

            // Display before delay
            Console.WriteLine($"Stock Fetch Started,{symbol}");

            // Simulate 2 second async delay (non-blocking)
            await Task.Delay(2000);

            // Display after delay
            Console.WriteLine($"Stock Price Update,{symbol},${currentPrice}");

            return $"Stock Data,{symbol},{currentPrice}";
        }

        // Override GetStatusAsync — displays request count
        public override async Task<string> GetStatusAsync()
        {
            await Task.Delay(0);
            string status = $"Stock Service Status,Requests:{requestCount}";
            Console.WriteLine(status);
            return status;
        }
    }
}
