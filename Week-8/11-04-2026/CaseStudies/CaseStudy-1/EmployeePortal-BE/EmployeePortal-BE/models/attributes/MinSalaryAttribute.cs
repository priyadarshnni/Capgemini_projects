using System.ComponentModel.DataAnnotations;

namespace EmployeePortal_BE.models.attributes
{
    public class MinSalaryAttribute : ValidationAttribute
    {
        private readonly int minSalary;

        public MinSalaryAttribute(int minSalary)
        {
            this.minSalary = minSalary;
        }
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value is decimal salary && minSalary > salary)
            {
                return new ValidationResult($"Salary must be at least 1000");
            }
            return ValidationResult.Success;
        }
    }
}
