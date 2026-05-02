using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAttendanceSystem.Model;
using StudentAttendanceSystem.Model;

namespace StudentAttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private static List<Attendance> attendanceRecords = new List<Attendance>();

        [HttpGet]
        public IActionResult Get() => Ok(attendanceRecords);

        [HttpPost]
        public IActionResult Add(Attendance attendance)
        {
            attendanceRecords.Add(attendance);
            return Ok(attendance);
        }
    }
}