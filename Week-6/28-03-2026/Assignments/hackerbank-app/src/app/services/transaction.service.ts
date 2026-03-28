import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  type: number;
  amount: number;
  balance: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // ⚠️ IMPORTANT: use HTTP if HTTPS gives error
  private apiUrl = 'http://localhost:5053/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  addTransaction(transaction: Transaction) {
    return this.http.post(this.apiUrl, transaction);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}