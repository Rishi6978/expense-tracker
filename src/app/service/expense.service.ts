import { Injectable, signal } from '@angular/core';
import { Expense } from '../model/expense.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseSignal = signal<Expense[]>([])

  constructor(private http:HttpClient) { }

  user = localStorage.getItem('user') || 'expenses';



  //get All expense
  getExpense() {
    
  this.user = localStorage.getItem('user') || 'expenses';
    this.http.get<Expense[]>('https://rishi-api-server.onrender.com/'+this.user)
      .subscribe(expenses => this.expenseSignal.set(expenses));
  }
  get expenses() {
    return this.expenseSignal;
  }
  //Add expense
  addExpense(expense: Expense) {
    this.http.post('https://rishi-api-server.onrender.com/'+this.user, expense)
      .subscribe(() => this.getExpense());
  }
  //Delete expense
  deleteExpense(id: number) {
    this.http.delete(`https://rishi-api-server.onrender.com/${this.user}/${id}`)
      .subscribe(() => this.getExpense());
  }
  //Update expense
  updateExpense(id: string, updatedExpense: Expense) {
    this.http.put(`https://rishi-api-server.onrender.com/${this.user}/${id}`, updatedExpense)
      .subscribe(() => this.getExpense());
  }
  //get expense by id
  getExpenseById(id: number) {
    return this.expenseSignal().find(expense => expense.id == id);
  }
  //get expense by category

}
