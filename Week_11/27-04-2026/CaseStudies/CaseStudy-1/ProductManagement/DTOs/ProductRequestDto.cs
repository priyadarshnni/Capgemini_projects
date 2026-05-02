using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    public class ProductRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string? Description { get; set; }

        public List<int>? TagIds { get; set; }
    }
}
