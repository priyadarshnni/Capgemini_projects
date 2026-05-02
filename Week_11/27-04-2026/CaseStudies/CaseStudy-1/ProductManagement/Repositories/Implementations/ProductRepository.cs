using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Models;

namespace ProductManagement.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(ProductRequestDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                ProductDetail = new ProductDetail
                {
                    Description = dto.Description ?? "",
                },
                ProductTags = dto.TagIds != null 
                    ? dto.TagIds.Select(t => new ProductTag { TagId = t }).ToList()
                    : new List<ProductTag>()
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductDetail)
                .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    CategoryName = p.Category.Name,
                    Description = p.ProductDetail.Description,
                    Tags = p.ProductTags.Select(t => t.Tag.Name).ToList()
                })
                .ToListAsync();
        }

        public async Task<ProductResponseDto> GetByIdAsync(int id)
        {
            var p = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductDetail)
                .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null) return null;
            return new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                CategoryName = p.Category.Name,
                Description = p.ProductDetail.Description,
                Tags = p.ProductTags.Select(t => t.Tag.Name).ToList()
            };
        }

        public async Task<bool> UpdateAsync(int id, ProductRequestDto dto)
        {
            var product = await _context.Products
                .Include(p => p.ProductDetail)
                .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return false;

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            
            if (product.ProductDetail != null) {
                product.ProductDetail.Description = dto.Description ?? "";
            } else {
                product.ProductDetail = new ProductDetail { Description = dto.Description ?? "" };
            }
            
            product.ProductTags.Clear();
            if (dto.TagIds != null) {
                product.ProductTags = dto.TagIds.Select(t => new ProductTag
                {
                    ProductId = id,
                    TagId = t
                }).ToList();
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}