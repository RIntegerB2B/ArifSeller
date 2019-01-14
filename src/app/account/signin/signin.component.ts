import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SignIn} from './signIn.model';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  signInModel: SignIn;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.signInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  signin() {
    this.signInModel = new SignIn();
    this.signInModel.userName = this.signInForm.controls.userName.value;
    this.signInModel.password = this.signInForm.controls.password.value;
    this.accountService.signIn(this.signInModel).subscribe(data => {
      /* console.log(data); */
    });
  }
}
