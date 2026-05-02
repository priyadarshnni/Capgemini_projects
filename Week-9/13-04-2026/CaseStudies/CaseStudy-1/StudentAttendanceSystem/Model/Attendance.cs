namespace StudentAttendanceSystem.Model
{
    public class Attendance
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public DateTime Date { get; set; }
        public bool isPresent { get; set; }

    }
}