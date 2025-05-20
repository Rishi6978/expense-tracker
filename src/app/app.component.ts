import { Component, inject, NgModule } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from './service/expense.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,MatSelectModule , MatSelectModule , FormsModule ,MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expenseTracker';
  allUsers = ['rishi', 'ankitha', 'expenses'];
  selectedUser: string | null = null; // ✅ an array
  router: any;
expenseService= inject(ExpenseService);

  onUserChange(user :string): void {
    console.log(this.selectedUser = user);
    localStorage.setItem('user', user);
    this.selectedUser = user; 
    // this.router.navigate(['/']); 
     this.expenseService.getExpense();
  }
}
