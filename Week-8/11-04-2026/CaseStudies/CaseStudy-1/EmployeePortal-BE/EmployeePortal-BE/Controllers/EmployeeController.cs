using EmployeePortal_BE.models.dto;
using EmployeePortal_BE.models.entities;
using EmployeePortal_BE.services;
using EmployeePortal_BE.services.impl;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private static List<Employees> employees = new List<Employees>();
        private IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        //Post create employee
        //[HttpPost]
        //public IActionResult CreateEmployee(CreateEmployeeDto createEmployeeDto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var newEmployee = new Employees
        //    {
        //        Id = Guid.NewGuid(),
        //        Name = createEmployeeDto.Name,
        //        Email = createEmployeeDto.Email,
        //        Department = createEmployeeDto.Department,
        //        Password = createEmployeeDto.Password,
        //        Phone = createEmployeeDto.Phone,
        //        Salary = createEmployeeDto.Salary,
        //        Address = createEmployeeDto.Address
        //    };

        //    employees.Add(newEmployee);
        //    var response = new EmployeeResponseDto
        //    {
        //        Id = newEmployee.Id,
        //        Address = newEmployee.Address,
        //        Department = newEmployee.Department,
        //        Email = newEmployee.Email,
        //        Name = newEmployee.Name,
        //        Phone = newEmployee.Phone
        //    };
        //    return CreatedAtAction(nameof(GetEmployeeById), new { id = newEmployee.Id }, response);
        //}

        [HttpPost]
        public IActionResult CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            return CreatedAtAction(nameof(GetEmployeeById), new { id = _employeeService.CreateEmployee(createEmployeeDto) }, createEmployeeDto);
        }

        //[HttpGet]
        //public IActionResult GetAllEmployees()
        //{
        //    var responses = employees.Select(e => new EmployeeResponseDto
        //    {
        //        Id = e.Id,
        //        Address = e.Address,
        //        Department = e.Department,
        //        Email = e.Email,
        //        Name = e.Name,
        //        Phone = e.Phone
        //    }).ToList();
        //    return Ok(responses);
        //}

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_employeeService.GetAllEmployees());
        }

        //[HttpGet("{id}")]
        //public IActionResult GetEmployeeById(Guid id)
        //{
        //    var employee = employees.FirstOrDefault(e => e.Id == id);
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }
        //    var response = new EmployeeResponseDto
        //    {
        //        Id = employee.Id,
        //        Address = employee.Address,
        //        Department = employee.Department,
        //        Email = employee.Email,
        //        Name = employee.Name,
        //        Phone = employee.Phone
        //    };
        //    return Ok(response);
        //}

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(Guid id)
        {
            return Ok(_employeeService.GetEmployeeById(id));
        }

    }
}
