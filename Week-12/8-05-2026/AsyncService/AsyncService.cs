// BASE CLASS: AsyncService
// -------------------------
// Base class for all async services
// virtual async = child classes can override these methods
// Task<string> = async return type (like string but non-blocking)

using System;
using System.Threading.Tasks;

namespace AsyncServiceOrchestration
{
    public class AsyncService
    {
        // Tracks how many requests have been made
        public int requestCount { get; set; } = 0;

        // Tracks last response time in milliseconds
        public long lastResponseTime { get; set; } = 0;

        // Virtual async method — child classes override this
        // endpoint = URL or identifier for the service
        public virtual async Task<string> FetchDataAsync(string endpoint)
        {
            requestCount++;
            await Task.Delay(2000); // simulate 2 second delay
            return $"Base Data from {endpoint}";
        }

        // Virtual async method — returns service status
        public virtual async Task<string> GetStatusAsync()
        {
            await Task.Delay(0); // no delay for status
            return $"Service Status,Requests:{requestCount}";
        }
    }
}
