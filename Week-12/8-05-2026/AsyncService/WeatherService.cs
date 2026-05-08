// DERIVED CLASS: WeatherService
// --------------------------------
// Inherits from AsyncService
// Fetches weather data for a city
// Simulates async delay of 2 seconds

using System;
using System.Threading.Tasks;

namespace AsyncServiceOrchestration
{
    public class WeatherService : AsyncService
    {
        // City name for weather lookup
        public string city { get; set; }

        // Temperature in celsius
        public int temperature { get; set; }

        // Constructor — sets city and default temperature
        public WeatherService(string city)
        {
            this.city = city;
            this.temperature = 22; // default temperature
        }

        // Override FetchDataAsync
        // Step 1: Display fetch started
        // Step 2: Wait 2 seconds (simulate API call)
        // Step 3: Display data received
        public override async Task<string> FetchDataAsync(string endpoint)
        {
            requestCount++;

            // Display before delay
            Console.WriteLine($"Weather Fetch Started,{city}");

            // Simulate 2 second async delay (non-blocking)
            await Task.Delay(2000);

            // Display after delay
            Console.WriteLine($"Weather Data Received,{city},{temperature}\u00b0C");

            return $"Weather Data,{city},{temperature}";
        }

        // Override GetStatusAsync — displays request count
        public override async Task<string> GetStatusAsync()
        {
            await Task.Delay(0);
            string status = $"Weather Service Status,Requests:{requestCount}";
            Console.WriteLine(status);
            return status;
        }
    }
}
