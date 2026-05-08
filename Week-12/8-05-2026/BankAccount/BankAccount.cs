// BASE CLASS: BankAccount
// ------------------------
// Enforces encapsulation through private setters
// private set = only this class can change balance
// readonly = accountNumber can only be set in constructor

using System;

namespace BankAccountHierarchy
{
    public class BankAccount
    {
        // readonly = can only be set in constructor, never changed after
        public string accountNumber { get; }

        // private set = balance can only be changed inside this class
        // Child classes access balance through protected methods
        public double balance { get; private set; }

        // Constructor — sets account number and initial balance
        public BankAccount(string accountNumber, double initialBalance)
        {
            this.accountNumber = accountNumber;
            this.balance = initialBalance;
        }

        // Protected method so child classes can update balance
        protected void SetBalance(double newBalance)
        {
            balance = newBalance;
        }

        // Virtual Deposit — validates amount > 0
        // Returns true if successful, false if invalid
        public virtual bool Deposit(double amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine("Deposit Failed: Amount must be greater than 0");
                return false;
            }

            balance += amount;
            Console.WriteLine($"Deposit Successful,Amount:{amount},Balance:{balance}");
            return true;
        }

        // Virtual Withdraw — validates sufficient balance
        // Returns true if successful, false if insufficient
        public virtual bool Withdraw(double amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine("Withdrawal Failed: Amount must be greater than 0");
                return false;
            }

            if (amount > balance)
            {
                Console.WriteLine("Withdrawal Failed: Insufficient balance");
                return false;
            }

            balance -= amount;
            Console.WriteLine($"Withdrawal Successful,Amount:{amount},Balance:{balance}");
            return true;
        }

        // Returns current balance
        public virtual double GetBalance()
        {
            return balance;
        }
    }
}
