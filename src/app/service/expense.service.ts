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
    this.http.get<Expense[]>('https://military-stripe-floss.glitch.me/expenses')
      .subscribe(expenses => this.expenseSignal.set(expenses));
  }
  get expenses() {
    return this.expenseSignal;
  }
  //Add expense
  addExpense(expense: Expense) {
    this.http.post('https://military-stripe-floss.glitch.me/expenses', expense)
      .subscribe(() => this.getExpense());
  }
  //Delete expense
  deleteExpense(id: number) {
    this.http.delete(`https://military-stripe-floss.glitch.me/expenses/${id}`)
      .subscribe(() => this.getExpense());
  }
  //Update expense
  updateExpense(id: string, updatedExpense: Expense) {
    this.http.put(`https://military-stripe-floss.glitch.me/expenses/${id}`, updatedExpense)
      .subscribe(() => this.getExpense());
  }
  //get expense by id
  getExpenseById(id: number) {
    return this.expenseSignal().find(expense => expense.id == id);
  }
  //get expense by category

}
