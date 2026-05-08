// PROGRAM.CS — Entry Point for BankAccount
// ------------------------------------------
// Reads input, creates correct account type
// Processes multiple operations
//
// Input Format:
// Line 1 → accountType (Savings or Current)
// Line 2 → accountNumber
// Line 3 → initial deposit amount
// Line 4+ → operations (Withdraw, Deposit, GetBalance, ApplyInterest, DeductTransactionFee)
//
// Sample Input:
// Savings
// SAV123
// 5000
// Withdraw 4500
// GetBalance
// ApplyInterest 5
//
// Sample Output:
// Withdrawal Failed: Minimum balance requirement 1000
// Current Balance: 5000
// Interest Applied,Rate:5,New Balance:5250

using System;

namespace BankAccountHierarchy
{
    class Program
    {
        static void Main(string[] args)
        {
            // Read account type
            string accountType = Console.ReadLine().Trim();

            // Read account number
            string accountNumber = Console.ReadLine().Trim();

            // Read initial balance
            double initialBalance = double.Parse(Console.ReadLine().Trim());

            // Create correct account type
            if (accountType == "Savings")
            {
                SavingsAccount savingsAccount = new SavingsAccount(accountNumber, initialBalance);

                // Read and process operations until end of input
                string line;
                while ((line = Console.ReadLine()) != null && line.Trim() != "")
                {
                    // Split operation and parameters
                    string[] parts = line.Trim().Split(' ');
                    string operation = parts[0];

                    if (operation == "Withdraw")
                    {
                        double amount = double.Parse(parts[1]);
                        savingsAccount.Withdraw(amount);
                    }
                    else if (operation == "Deposit")
                    {
                        double amount = double.Parse(parts[1]);
                        savingsAccount.Deposit(amount);
                    }
                    else if (operation == "GetBalance")
                    {
                        Console.WriteLine($"Current Balance: {savingsAccount.GetBalance()}");
                    }
                    else if (operation == "ApplyInterest")
                    {
                        double rate = double.Parse(parts[1]);
                        savingsAccount.ApplyInterest(rate);
                    }
                }
            }
            else if (accountType == "Current")
            {
                CurrentAccount currentAccount = new CurrentAccount(accountNumber, initialBalance);

                // Read and process operations until end of input
                string line;
                while ((line = Console.ReadLine()) != null && line.Trim() != "")
                {
                    string[] parts = line.Trim().Split(' ');
                    string operation = parts[0];

                    if (operation == "Withdraw")
                    {
                        double amount = double.Parse(parts[1]);
                        currentAccount.Withdraw(amount);
                    }
                    else if (operation == "Deposit")
                    {
                        double amount = double.Parse(parts[1]);
                        currentAccount.Deposit(amount);
                    }
                    else if (operation == "GetBalance")
                    {
                        Console.WriteLine($"Current Balance: {currentAccount.GetBalance()}");
                    }
                    else if (operation == "DeductTransactionFee")
                    {
                        currentAccount.DeductTransactionFee();
                    }
                }
            }
            else
            {
                Console.WriteLine("Invalid account type. Use Savings or Current.");
            }
        }
    }
}
