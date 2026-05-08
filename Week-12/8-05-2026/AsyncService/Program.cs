// PROGRAM.CS — Entry Point for AsyncService
// ------------------------------------------
// Reads input, creates correct service type
// Executes command and displays result
//
// Input Format:
// Line 1 → serviceType (Weather or Stock)
// Line 2 → identifier (city or symbol)
// Line 3 → command (FetchDataAsync or GetStatusAsync)
//
// Sample Input:
// Weather
// NewYork
// FetchDataAsync
//
// Sample Output:
// Weather Fetch Started,NewYork
// (2 second delay)
// Weather Data Received,NewYork,22°C

using System;
using System.Threading.Tasks;

namespace AsyncServiceOrchestration
{
    class Program
    {
        // Main must be async to use await
        static async Task Main(string[] args)
        {
            // Read service type
            string serviceType = Console.ReadLine().Trim();

            // Read identifier (city or symbol)
            string identifier = Console.ReadLine().Trim();

            // Read command
            string command = Console.ReadLine().Trim();

            if (serviceType == "Weather")
            {
                // Create WeatherService with city
                WeatherService weatherService = new WeatherService(identifier);

                if (command == "FetchDataAsync")
                {
                    // await = wait for async operation to complete
                    await weatherService.FetchDataAsync(identifier);
                }
                else if (command == "GetStatusAsync")
                {
                    await weatherService.GetStatusAsync();
                }
            }
            else if (serviceType == "Stock")
            {
                // Create StockService with symbol
                StockService stockService = new StockService(identifier);

                if (command == "FetchDataAsync")
                {
                    await stockService.FetchDataAsync(identifier);
                }
                else if (command == "GetStatusAsync")
                {
                    await stockService.GetStatusAsync();
                }
            }
            else
            {
                Console.WriteLine("Invalid service type. Use Weather or Stock.");
            }
        }
    }
}
