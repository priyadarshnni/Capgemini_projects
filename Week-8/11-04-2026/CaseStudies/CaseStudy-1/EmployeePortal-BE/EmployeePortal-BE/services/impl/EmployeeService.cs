using EmployeePortal_BE.models.dto;
using EmployeePortal_BE.models.entities;

namespace EmployeePortal_BE.services.impl
{
    public class EmployeeService : IEmployeeService
    {
        private static List<Employees> employees = new List<Employees>();
        public EmployeeResponseDto CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            var newEmployee = new Employees
            {
                Id = Guid.NewGuid(),
                Name = createEmployeeDto.Name,
                Email = createEmployeeDto.Email,
                Department = createEmployeeDto.Department,
                Password = createEmployeeDto.Password,
                Phone = createEmployeeDto.Phone,
                Salary = createEmployeeDto.Salary,
                Address = createEmployeeDto.Address
            };

            employees.Add(newEmployee);
            var response = new EmployeeResponseDto
            {
                Id = newEmployee.Id,
                Address = newEmployee.Address,
                Department = newEmployee.Department,
                Email = newEmployee.Email,
                Name = newEmployee.Name,
                Phone = newEmployee.Phone
            };
            return response;
        }

        public EmployeeResponseDto GetEmployeeById(Guid id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return null;
            }
            var response = new EmployeeResponseDto
            {
                Id = employee.Id,
                Address = employee.Address,
                Department = employee.Department,
                Email = employee.Email,
                Name = employee.Name,
                Phone = employee.Phone
            };
            return response;
        }

        public List<EmployeeResponseDto> GetAllEmployees()
        {
            var responses = employees.Select(e => new EmployeeResponseDto
            {
                Id = e.Id,
                Address = e.Address,
                Department = e.Department,
                Email = e.Email,
                Name = e.Name,
                Phone = e.Phone
            }).ToList();
            return responses;
        }
    }
}
