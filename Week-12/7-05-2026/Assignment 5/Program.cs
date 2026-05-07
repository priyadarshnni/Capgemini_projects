using System;
using System.Collections.Generic;
using System.Linq;

class StudentGradeProcessor
{
    static void Main()
    {
        // Sample input
        Dictionary<string, int[]> students = new Dictionary<string, int[]>
        {
            {"John", new int[]{85, 90, 78, 92}},
            {"Sarah", new int[]{95, 88, 91, 89}},
            {"Mike", new int[]{70, 65, 80, 75}},
            {"Emma", new int[]{88, 92, 94, 96}}
        };

        Console.WriteLine("--- Student Grade Report ---\n");

        double highestAvg = 0;
        string topStudent = "";

        HashSet<int> uniqueGrades = new HashSet<int>();

        // 🔹 Process each student
        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            double avg = grades.Average();
            int max = grades.Max();
            int min = grades.Min();

            Console.WriteLine($"{name}: Average = {avg:F2}, Highest = {max}, Lowest = {min}");

            // Track top performer
            if (avg > highestAvg)
            {
                highestAvg = avg;
                topStudent = name;
            }

            // Add grades to HashSet
            foreach (int g in grades)
                uniqueGrades.Add(g);
        }

        // 🔹 Top Performer
        Console.WriteLine($"\nTop Performer: {topStudent} (Average: {highestAvg:F2})\n");

        // 🔹 Students with all grades >= 80
        Console.WriteLine("Students with all grades >= 80:");

        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            if (grades.All(g => g >= 80))
            {
                Console.WriteLine($"{name} ({string.Join(",", grades)})");
            }
        }

        // 🔹 Unique grade values
        Console.WriteLine("\nUnique Grade Values Across All Students:");

        var sortedGrades = uniqueGrades.OrderBy(x => x);

        Console.WriteLine(string.Join(",", sortedGrades));
        Console.WriteLine($"Total unique grades: {uniqueGrades.Count}");
    }
}