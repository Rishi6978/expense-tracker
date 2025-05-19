import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../service/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Expense } from '../model/expense.model';


@Component({
  selector: 'app-expense-add-edit',
  imports: [CommonModule,ReactiveFormsModule,MatButtonModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatCardModule,MatFormFieldModule, MatIconModule],
  templateUrl: './expense-add-edit.component.html',
  styleUrl: './expense-add-edit.component.css'
})
export class ExpenseAddEditComponent {
  expenseService= inject(ExpenseService);
  router= inject(Router);
  snackBar= inject(MatSnackBar);
  route= inject(ActivatedRoute);

  categories: string[] = [
    'Food',
    'Bills',
    'Housing',
    'Entertainment',
    'Transportation',
    'Education',
    'Shopping',
    'Other'
  ];

  expenseForm: FormGroup;

  isEditMode: boolean = false;
  expenseId: number= 0;
  constructor(private fb:FormBuilder) {

 this.expenseForm = this.fb.group({
  title: ["", Validators.required],
  category: ["", Validators.required],
  amount: ["", [Validators.required, Validators.min(0)]],
  date: [null, Validators.required]
});
  this.route.params.subscribe(params => {
    const id = params['id'];

    if (id) {
      this.isEditMode = true;
      this.expenseId = +id;
      this.expenseService.getExpense();

effect(() => {
  const expense = this.expenseService.expenses();;
if (expense.length > 0) {
  this.loadExpenseData(this.expenseId);

    }
  })
}
});
  }


  loadExpenseData(expenseId: number) {
    const expense = this.expenseService.getExpenseById(expenseId);
    console.log(expense);
    console.log('inside ');

    if (expense) {
      this.expenseForm.patchValue({
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
         date: new Date(expense.date)
      })
    }

  }

  onSubmit(){
    //alert(this.expenseForm);
    console.log(this.expenseForm.value);
    if(this.expenseForm.valid){
    
 const expense :Expense = {...this.expenseForm.value, id: this.expenseId || Date.now()};

 if(this.isEditMode && this.expenseId!==null){

  //we edit the expense

  this.expenseService.updateExpense(this.expenseId.toString(), expense);
  this.snackBar.open("Expense updated successfully")


    }else{
// we add the expense
      this.expenseService.addExpense(expense);
      this.snackBar.open("Expense added successfully")

    }
    this.router.navigate(['/dashboard']);
  
  }


  }
}



export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    dateInput: 'yyyy-MM-dd',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
}







