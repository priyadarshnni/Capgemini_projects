// DERIVED CLASS: CurrentAccount
// --------------------------------
// Inherits from BankAccount
// Allows overdraft up to overdraftLimit
// Deducts transaction fee on each withdrawal

using System;

namespace BankAccountHierarchy
{
    public class CurrentAccount : BankAccount
    {
        // Maximum overdraft allowed e.g. 5000
        // Can withdraw even if balance goes negative up to this limit
        public double overdraftLimit { get; set; }

        // Fee deducted per transaction
        public double transactionFee { get; set; }

        // Constructor — calls base constructor
        public CurrentAccount(string accountNumber, double initialBalance)
            : base(accountNumber, initialBalance)
        {
            overdraftLimit = 5000; // default overdraft limit
            transactionFee = 10;   // default transaction fee
        }

        // Override Withdraw — allows overdraft up to overdraftLimit
        // balance can go negative but not below -overdraftLimit
        public override bool Withdraw(double amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine("Withdrawal Failed: Amount must be greater than 0");
                return false;
            }

            // Check if withdrawal exceeds overdraft limit
            if (balance - amount < -overdraftLimit)
            {
                Console.WriteLine($"Withdrawal Failed: Overdraft limit exceeded");
                return false;
            }

            // Valid withdrawal — update balance
            SetBalance(balance - amount);
            Console.WriteLine($"Withdrawal Successful,Amount:{amount},Balance:{balance}");
            return true;
        }

        // New method — deducts transaction fee from balance
        public void DeductTransactionFee()
        {
            SetBalance(balance - transactionFee);
            Console.WriteLine($"Fee Deducted,Amount:{transactionFee},Remaining:{balance}");
        }
    }
}
