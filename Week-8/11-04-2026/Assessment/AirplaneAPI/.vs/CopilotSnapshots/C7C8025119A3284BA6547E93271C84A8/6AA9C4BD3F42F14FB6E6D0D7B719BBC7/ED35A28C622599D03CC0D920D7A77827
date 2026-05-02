using System.ComponentModel.DataAnnotations;
using AirplaneAPI.Validations;

namespace AirplaneAPI.DTOs
{
    public class UpdateAirplaneDto : IValidatableObject
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string ModelName { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Manufacturer { get; set; } = string.Empty;

        [Range(1, 1000, ErrorMessage = "Capacity must be between 1 and 1000.")]
        public int Capacity { get; set; }

        [Range(1000000, 999999999, ErrorMessage = "Price must be between 1,000,000 and 999,999,999.")]
        public decimal Price { get; set; }

        [Required]
        [AllowedEngineType(new string[] { "Jet", "Turboprop", "Piston" })]
        public string EngineType { get; set; } = string.Empty;

        [Required]
        public DateTime ManufactureDate { get; set; }

        public bool IsCargo { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Country can contain only letters and spaces.")]
        public string Country { get; set; } = string.Empty;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (ManufactureDate > DateTime.Now)
            {
                yield return new ValidationResult(
                    "ManufactureDate cannot be in the future.",
                    new[] { nameof(ManufactureDate) });
            }

            if (IsCargo && Capacity > 100)
            {
                yield return new ValidationResult(
                    "Cargo airplane capacity should not be greater than 100.",
                    new[] { nameof(Capacity), nameof(IsCargo) });
            }
        }
    }
}