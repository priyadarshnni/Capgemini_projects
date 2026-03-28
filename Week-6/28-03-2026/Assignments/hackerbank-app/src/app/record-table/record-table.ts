import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../services/transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-table.html'
})
export class RecordTableComponent implements OnInit {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedDate: string = '';

  newTransaction: Transaction = {
    id: 0,
    date: '',
    description: '',
    type: 0,
    amount: 0,
    balance: ''
  };

  constructor(private service: TransactionService) {}

  ngOnInit() {
    this.loadData();
  }

  // 🔥 LOAD DATA
  loadData() {
    this.service.getTransactions().subscribe({
      next: (data) => {
        console.log("DATA:", data);
        this.transactions = data;
        this.filteredTransactions = [...data]; // 🔥 IMPORTANT COPY
      },
      error: (err) => {
        console.error("LOAD ERROR:", err);
      }
    });
  }

  // 🔍 FILTER
  filterByDate() {
    if (!this.selectedDate) {
      this.filteredTransactions = [...this.transactions];
      return;
    }

    this.filteredTransactions = this.transactions.filter(
      t => t.date.startsWith(this.selectedDate)
    );
  }

  // 🔃 SORT
  sortByAmount() {
    this.filteredTransactions = [...this.filteredTransactions].sort((a, b) => a.amount - b.amount);
  }

  // ➕ ADD
  addTransaction() {

    if (!this.newTransaction.description || !this.newTransaction.date) {
      alert("Fill all fields");
      return;
    }

    this.service.addTransaction(this.newTransaction).subscribe({
      next: () => {
        console.log("ADDED");

        // 🔥 FORCE REFRESH
        this.loadData();

        this.newTransaction = {
          id: 0,
          date: '',
          description: '',
          type: 0,
          amount: 0,
          balance: ''
        };
      },
      error: (err) => {
        console.error("ADD ERROR:", err);
      }
    });
  }

  // ❌ DELETE
  deleteTransaction(id: number) {
    this.service.deleteTransaction(id).subscribe({
      next: () => {
        console.log("DELETED");
        this.loadData(); // 🔥 FORCE REFRESH
      },
      error: (err) => {
        console.error("DELETE ERROR:", err);
      }
    });
  }
}