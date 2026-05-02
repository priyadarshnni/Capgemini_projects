using System.ComponentModel.DataAnnotations;

namespace EmployeePortal_BE.models.attributes
{
    public class MinMaxSalaryAttribute : ValidationAttribute
    {
        private readonly int minimumSalary;
        private readonly int maximumSalary;

        public MinMaxSalaryAttribute(int minimumSalary, int maximumSalary)
        {
            this.minimumSalary = minimumSalary;
            this.maximumSalary = maximumSalary;
        }
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value is decimal salary)
            {
                if(salary < minimumSalary)
                {
                    return new ValidationResult($"Salary must be at least {minimumSalary}");
                }
                if(salary > maximumSalary)
                {
                    return new ValidationResult($"Salary must be at most {maximumSalary}");
                }
            }
            return ValidationResult.Success;
        }
    }
}
