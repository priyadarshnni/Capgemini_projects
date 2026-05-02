using Microsoft.AspNetCore.Mvc;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductRepository _repo;
        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repo.GetAllAsync();
            return View(data);
        }
        
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            return data==null ? NotFound() : View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductRequestDto dto)
        {
            if (ModelState.IsValid)
            {
                try 
                {
                    await _repo.CreateAsync(dto);
                    return RedirectToAction(nameof(GetAll));
                }
                catch (Exception ex)
                {
                    string msg = ex.InnerException?.Message ?? ex.Message;
                    if (msg.Contains("FOREIGN KEY constraint") && msg.Contains("CategoryId"))
                        ModelState.AddModelError("CategoryId", "The specified Category ID does not exist in the database.");
                    else
                        ModelState.AddModelError("", "Database error: " + msg);
                }
            }
            return View(dto);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            if (data == null) return NotFound();
            var dto = new ProductRequestDto
            {
                Name = data.Name,
                Price = data.Price,
                Description = data.Description
            };
            return View(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, ProductRequestDto dto)
        {
            if (ModelState.IsValid)
            {
                try 
                {
                    await _repo.UpdateAsync(id, dto);
                    return RedirectToAction(nameof(GetAll));
                }
                catch (Exception ex)
                {
                    string msg = ex.InnerException?.Message ?? ex.Message;
                    if (msg.Contains("FOREIGN KEY constraint") && msg.Contains("CategoryId"))
                        ModelState.AddModelError("CategoryId", "The specified Category ID does not exist in the database.");
                    else
                        ModelState.AddModelError("", "Database error: " + msg);
                }
            }
            return View(dto);
        }

        [HttpGet]
         public async Task<IActionResult> Delete(int id)
         {
            var data = await _repo.GetByIdAsync(id);
            return data == null ? NotFound() : View(data);
         }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _repo.DeleteAsync(id);
            return RedirectToAction(nameof(GetAll));
        }
    }
}
