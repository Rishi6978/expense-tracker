import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../service/expense.service';
import { Expense } from '../model/expense.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-grid',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './expense-grid.component.html',
  styleUrl: './expense-grid.component.css',
})
export class ExpenseGridComponent {
  expenseService = inject(ExpenseService);
  snackbar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'amount',
    'date',
    'actions',
  ];

  dataSource = new MatTableDataSource<Expense>([]);
  totalIems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  expenses = this.expenseService.expenses;

  constructor() {
    this.expenseService.getExpense();

    effect(() => {
      const expenses = this.expenses();
      this.dataSource.data = expenses;
    
      this.totalIems = expenses.length;
    });
  }

  sortByDate() {
    this.dataSource.data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
     return dateB.getTime() - dateA.getTime(); // Ascending order
      // For descending order, use: return dateB.getTime() - dateA.getTime();
    });
  }

// ngOnInit() {
// this.expenseService.getExpense();
// }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



onDelete(expenseId: number) {



  if (confirm('Are you sure you want to delete this expense?')) {
    this.expenseService.deleteExpense(expenseId);
    this.snackbar.open('Expense deleted successfully', 'Close', {
      duration: 2000,
    });
  } else {
    // User clicked "Cancel", do nothing
    this.snackbar.open('Expense not deleted ', 'Close', {
      duration: 2000,})
  }



 
}

}
