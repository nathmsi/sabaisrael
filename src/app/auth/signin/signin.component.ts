import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowReference } from 'src/app/models/windowRef.model';
import { Subscription } from 'rxjs';
import { WindowRef } from 'src/app/services/windowRef.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  loadingContent: boolean = false;
  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;

  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private _snackBar: MatSnackBar, 
    private router: Router,
    private windowRefer: WindowRef,
    ) { 
      this.SubscriptionRefWindow = this.windowRefer.windowSubject.subscribe(
        (windowRefer: WindowReference) => {
          this.windowRef = windowRefer;
        }
      )
  
      this.windowRefer.emitWindowRef();
    }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] // firebase need password size >= 6
    });
  }
  onSubmit() {
    this.loadingContent = true;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.signInUser(email, password).then(() => {
      this._snackBar.open( 'welcome ' + this.authService.user.name , 'close');
      this.loadingContent = false;
      this.router.navigate(['/']);
    }, (error) => {
      this.loadingContent = false;
      this.errorMessage = error;
      this._snackBar.open( error , 'close');
    });
  }

  handelSigUp(){
    this.router.navigate(['auth','signup']);
  }



}
