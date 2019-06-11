import { Component } from '@angular/core';
import { FormBuilder, AbstractControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { CrossFieldErrorStateMatcher } from './CrossFieldErrorStateMatcher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  errorMatcher: ErrorStateMatcher = new CrossFieldErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        dateFrom: null,
        dateTo: null,
      },
      {
        validators: (control: AbstractControl): ValidationErrors | null => {
          const dateTo = control.get('dateTo').value;
          const dateFrom = control.get('dateFrom').value;

          if (!(dateTo instanceof Date) || !(dateFrom instanceof Date)) {
            return null;
          }

          if (dateTo.getTime() >= dateFrom.getTime()) {
            return null;
          }

          return { dateComparison: true };
        },
      }
    );

    this.form.valueChanges.pipe(tap(console.log)).subscribe();
  }
}
