using EmployeePortal_BE.models.dto;

namespace EmployeePortal_BE.models.entities
{
    public class Employees
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Department { get; set; }
        public required string Password { get; set; }
        public required string Phone { get; set; }
        public AddressDto Address { get; set; }
        public decimal Salary { get; set; }

    }
}
