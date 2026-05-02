using ProductManagement.Repositories.Implementations;
using ProductManagement.DTOs;
namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductResponseDto> GetByIdAsync(int id);
        Task<int> CreateAsync(ProductRequestDto dto);
        Task<bool> UpdateAsync(int id, ProductRequestDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
