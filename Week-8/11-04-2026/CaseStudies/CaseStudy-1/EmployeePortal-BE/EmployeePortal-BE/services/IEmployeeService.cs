using EmployeePortal_BE.models.dto;

namespace EmployeePortal_BE.services
{
    public interface IEmployeeService
    {
        EmployeeResponseDto CreateEmployee(CreateEmployeeDto createEmployeeDto);
        EmployeeResponseDto GetEmployeeById(Guid id);
        List<EmployeeResponseDto> GetAllEmployees();
    }
}
