using System.ComponentModel.DataAnnotations;

namespace AirplaneAPI.Validations
{
    public class AllowedEngineTypeAttribute : ValidationAttribute
    {
        private readonly string[] _allowedTypes;

        public AllowedEngineTypeAttribute(string[] allowedTypes)
        {
            _allowedTypes = allowedTypes;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return new ValidationResult("EngineType is required.");

            var engineType = value.ToString();

            if (_allowedTypes.Contains(engineType, StringComparer.OrdinalIgnoreCase))
                return ValidationResult.Success;

            return new ValidationResult($"EngineType must be one of: {string.Join(", ", _allowedTypes)}");
        }
    }
}