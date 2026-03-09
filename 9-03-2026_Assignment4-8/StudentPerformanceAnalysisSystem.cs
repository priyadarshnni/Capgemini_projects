using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
}

public class AnalysisEngine
{
    public void Analyze(List<Student> students)
    {
        var passedStudents = students.Where(s => s.Marks >= 50).Select(s => s.Name);
        Console.WriteLine("Passed Students:");
        Console.WriteLine(string.Join("\n", passedStudents));

        var topper = students.OrderByDescending(s => s.Marks).First();
        Console.WriteLine("\nTopper:");
        Console.WriteLine(topper.Name + " - " + topper.Marks);

        var sortedStudents = students.OrderByDescending(s => s.Marks)
                                     .Select(s => s.Name + " - " + s.Marks);
        Console.WriteLine("\nStudents Sorted by Marks:");
        Console.WriteLine(string.Join("\n", sortedStudents));
    }
}

public class Solution
{
    public static void Main()
    {
        List<Student> students = new List<Student>
        {
            new Student { StudentId = 101, Name = "Ananya", Marks = 78 },
            new Student { StudentId = 102, Name = "Ravi", Marks = 45 },
            new Student { StudentId = 103, Name = "Neha", Marks = 88 },
            new Student { StudentId = 104, Name = "Arjun", Marks = 67 }
        };

        AnalysisEngine engine = new AnalysisEngine();
        engine.Analyze(students);
        Console.WriteLine();
    }
}