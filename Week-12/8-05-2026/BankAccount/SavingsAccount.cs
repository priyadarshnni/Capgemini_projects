// DERIVED CLASS: SavingsAccount
// --------------------------------
// Inherits from BankAccount
// Enforces minimum balance rule on withdrawal
// Has interest rate for applying interest

using System;

namespace BankAccountHierarchy
{
    public class SavingsAccount : BankAccount
    {
        // Interest rate percentage e.g. 5 = 5%
        public double interestRate { get; set; }

        // Minimum balance that must remain after withdrawal
        // Default value = 1000
        public double minimumBalance { get; set; } = 1000;

        // Constructor — calls base constructor
        public SavingsAccount(string accountNumber, double initialBalance)
            : base(accountNumber, initialBalance)
        {
            interestRate = 0; // default interest rate
        }

        // Override Withdraw — enforces minimum balance rule
        // balance cannot go below minimumBalance after withdrawal
        public override bool Withdraw(double amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine("Withdrawal Failed: Amount must be greater than 0");
                return false;
            }

            // Check if withdrawal would go below minimum balance
            if (balance - amount < minimumBalance)
            {
                Console.WriteLine($"Withdrawal Failed: Minimum balance requirement {minimumBalance}");
                return false;
            }

            // Valid withdrawal — update balance
            SetBalance(balance - amount);
            Console.WriteLine($"Withdrawal Successful,Amount:{amount},Balance:{balance}");
            return true;
        }

        // New method — applies interest to current balance
        // interest = balance * (interestRate / 100)
        public void ApplyInterest(double rate)
        {
            interestRate = rate;
            double interest = balance * (interestRate / 100);
            SetBalance(balance + interest);
            Console.WriteLine($"Interest Applied,Rate:{interestRate},New Balance:{balance}");
        }
    }
}
