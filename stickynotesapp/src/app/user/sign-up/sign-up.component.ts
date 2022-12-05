import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, FormGroupDirective, Validators, FormGroup, FormBuilder} from '@angular/forms';  

import { UserService } from 'src/app/shared/user.service';
// gore je '../../shared/user.service';

import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})

export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      confirmPass:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//     return (invalidCtrl || invalidParent);
//   }
// }

// /** @title Input with a custom ErrorStateMatcher */
// @Component({
// selector: 'input-error-state-matcher-example',
// templateUrl: './input-error-state-matcher-example.html',
// styleUrls: ['./input-error-state-matcher-example.css'],
// })
// export class InputErrorStateMatcherExample {
// myForm: FormGroup;

// matcher = new MyErrorStateMatcher();

// constructor(private formBuilder: FormBuilder) {
//   this.myForm = this.formBuilder.group({
//     password: ['', [Validators.required]],
//     confirmPassword: ['']
//   }, { validator: this.checkPasswords });

// }

// checkPasswords(group: FormGroup) { // here we have the 'passwords' group
//   let pass = group.controls['password'].value;
//   let confirmPass = group.controls['confirmPass'].value;

//   return pass === confirmPass ? null : { notSame: true }
// }
// }

// passFormControl = new FormControl('', [
//   Validators.required,
// ]);
// confirmFormControl = new FormControl('', [
//   Validators.required,
//   ]);

//    hide =true;
