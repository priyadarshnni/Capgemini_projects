// No database — using static in-memory list instead
// Data resets when app restarts — good for testing

using Microsoft.AspNetCore.Mvc;
using NewFood.Models;

namespace NewFood.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        // Static list acts as in-memory database
        // static = shared across all requests
        private static List<FoodItem> _foodItems = new List<FoodItem>
        {
            new FoodItem { Id = 1, FoodName = "Pizza",   Category = "NonVeg", Price = 299 },
            new FoodItem { Id = 2, FoodName = "Salad",   Category = "Veg",    Price = 149 },
            new FoodItem { Id = 3, FoodName = "Burger",  Category = "NonVeg", Price = 199 },
            new FoodItem { Id = 4, FoodName = "Paneer",  Category = "Veg",    Price = 249 },
        };

        // Auto increment ID counter
        private static int _nextId = 5;

        // GET: api/food
        // Returns all food items
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_foodItems);
        }

        // GET: api/food/1
        // Returns single food item by ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _foodItems.FirstOrDefault(f => f.Id == id);

            if (item == null)
                return NotFound(new { message = $"Food item with ID {id} not found" });

            return Ok(item);
        }

        // POST: api/food
        // Adds new food item to list
        // Body: { "foodName": "Dosa", "category": "Veg", "price": 99 }
        [HttpPost]
        public IActionResult Create([FromBody] FoodItem item)
        {
            item.Id = _nextId++;       // assign next available ID
            _foodItems.Add(item);      // add to list
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        // PUT: api/food/1
        // Updates existing food item by ID
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] FoodItem updated)
        {
            var item = _foodItems.FirstOrDefault(f => f.Id == id);

            if (item == null)
                return NotFound(new { message = $"Food item with ID {id} not found" });

            // Update fields
            item.FoodName = updated.FoodName;
            item.Category = updated.Category;
            item.Price = updated.Price;

            return Ok(item);
        }

        // DELETE: api/food/1
        // Removes food item from list by ID
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _foodItems.FirstOrDefault(f => f.Id == id);

            if (item == null)
                return NotFound(new { message = $"Food item with ID {id} not found" });

            _foodItems.Remove(item);
            return Ok(new { message = $"'{item.FoodName}' deleted successfully" });
        }
    }
}