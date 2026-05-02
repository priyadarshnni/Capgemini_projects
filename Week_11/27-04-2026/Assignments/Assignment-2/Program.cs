// using System;
// using System.Collections.Generic;

// class Program
// {
//     static int n, m;
//     static int[,] mat;
//     // DP Dictionary: (i, j, x, y) → result
//     static Dictionary<string, int> dp = new Dictionary<string, int>();
//     static bool IsValid(int i, int j)
//     {
//         return (i >= 0 && i < n && j >= 0 && j < m && mat[i, j] != -1);
//     }
//     static int Solve(int i, int j, int x, int y)
//     {
//         int y2 = i + j - x; // derived (since steps are same)
//         if (!IsValid(i, j) || !IsValid(x, y2))
//             return int.MinValue;

//         // reached destination
//         if (i == n - 1 && j == m - 1)
//         {
//             return mat[i, j] == 1 ? 1 : 0;
//         }
//         string key = $"{i},{j},{x}";
//         if (dp.ContainsKey(key))
//             return dp[key];

//         int current = 0;
//         // if both at same cell
//         if (i == x && j == y2)
//         {
//             if (mat[i, j] == 1)
//                 current = 1;
//         }
//         else
//         {
//             if (mat[i, j] == 1) current++;
//             if (mat[x, y2] == 1) current++;
//         }
//         // 4 movement combinations
//         int op1 = Solve(i + 1, j, x + 1, y2);     // down, down
//         int op2 = Solve(i, j + 1, x, y2 + 1);     // right, right
//         int op3 = Solve(i + 1, j, x, y2 + 1);     // down, right
//         int op4 = Solve(i, j + 1, x + 1, y2);     // right, down

//         int bestNext = Math.Max(Math.Max(op1, op2), Math.Max(op3, op4));
//         int result = current + bestNext;
//         dp[key] = result;
//         return result;
//     }

//     static void Main()
//     {
//         n = int.Parse(Console.ReadLine());
//         m = int.Parse(Console.ReadLine());

//         mat = new int[n, m];

//         for (int i = 0; i < n; i++)
//         {
//             string[] input = Console.ReadLine().Split();
//             for (int j = 0; j < m; j++)
//             {
//                 mat[i, j] = int.Parse(input[j]);
//             }
//         }

//         int ans = Solve(0, 0, 0, 0);

//         Console.WriteLine(ans < 0 ? 0 : ans);
//     }
// }

//---------------------------------- Question-2 ----------------------------------//


using System;
using System.Collections.Generic;

class Program
{
    static int MinLights(int[] locations, int n)
    {
        // Step 1: Build intervals
        List<(int start, int end)> ranges = new List<(int, int)>();

        for (int i = 0; i < n; i++)
        {
            int pos = i + 1; // 1-based position
            int left = Math.Max(1, pos - locations[i]);
            int right = Math.Min(n, pos + locations[i]);

            ranges.Add((left, right));
        }

        // Step 2: Sort by start
        ranges.Sort((a, b) =>
        {
            if (a.start == b.start)
                return b.end.CompareTo(a.end); // larger end first
            return a.start.CompareTo(b.start);
        });

        int count = 0;
        int iIndex = 0;
        int coveredTill = 0;
        int maxReach = 0;

        // Step 3: Greedy selection
        while (coveredTill < n)
        {
            while (iIndex < n && ranges[iIndex].start <= coveredTill + 1)
            {
                maxReach = Math.Max(maxReach, ranges[iIndex].end);
                iIndex++;
            }

            // If we cannot extend coverage
            if (maxReach <= coveredTill)
                return -1;

            count++;
            coveredTill = maxReach;
        }

        return count;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int[] locations = new int[n];

        for (int i = 0; i < n; i++)
        {
            locations[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine(MinLights(locations, n));
    }
}