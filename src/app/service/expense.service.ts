import { Injectable, signal } from '@angular/core';
import { Expense } from '../model/expense.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseSignal = signal<Expense[]>([])

  constructor(private http:HttpClient) { }

  //get All expense
  getExpense() {
    this.http.get<Expense[]>('http://localhost:3000/expenses')
      .subscribe(expenses => this.expenseSignal.set(expenses));
  }
  get expenses() {
    return this.expenseSignal;
  }
  //Add expense
  addExpense(expense: Expense) {
    this.http.post('http://localhost:3000/expenses', expense)
      .subscribe(() => this.getExpense());
  }
  //Delete expense
  deleteExpense(id: number) {
    this.http.delete(`http://localhost:3000/expenses/${id}`)
      .subscribe(() => this.getExpense());
  }
  //Update expense
  updateExpense(id: string, updatedExpense: Expense) {
    this.http.put(`http://localhost:3000/expenses/${id}`, updatedExpense)
      .subscribe(() => this.getExpense());
  }
  //get expense by id
  getExpenseById(id: number) {
    return this.expenseSignal().find(expense => expense.id == id);
  }
  //get expense by category

}
