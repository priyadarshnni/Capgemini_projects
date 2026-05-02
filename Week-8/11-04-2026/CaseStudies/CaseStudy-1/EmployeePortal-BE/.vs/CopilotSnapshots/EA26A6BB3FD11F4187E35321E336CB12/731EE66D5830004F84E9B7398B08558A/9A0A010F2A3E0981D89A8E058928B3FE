using System.ComponentModel.DataAnnotations;

namespace EmployeePortal_BE.models.attributes
{
    public class CheckPasswordAttribute : ValidationAttribute
    {
        private readonly int MinimumLength = 8;

        public CheckPasswordAttribute()
        {
            ErrorMessage = "Password must meet all requirements.";
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string password = value.ToString();

            if (password.Length < MinimumLength)
            {
                return new ValidationResult($"Password must be at least {MinimumLength} characters long.");
            }

            if (!password.Any(char.IsUpper) || !password.Any(char.IsLower) || !password.Any(char.IsDigit))
            {
                return new ValidationResult("Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), and one digit (0-9).");
            }

            return ValidationResult.Success;
        }
    }
}
