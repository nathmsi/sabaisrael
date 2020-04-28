import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowRef } from 'src/app/services/windowRef.service';
import { WindowReference } from 'src/app/models/windowRef.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  loadingContent: boolean = false;
  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
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
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] // firebase need password size >= 6
    });
  }

  onSubmit() {
    this.loadingContent = true;
    const email = this.signupForm.get('email').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password, username).then(
      () => {
        this.loadingContent = false;
        this._snackBar.open( 'user created success ' + username, 'close');
        this.router.navigate(['/']);
      },
      (error) => {
        this.loadingContent = false;
        this.errorMessage = error;
        this._snackBar.open( error , 'close');
      }
    );

  }

  handelSigin(){
    this.router.navigate(['auth','signin']);
  }

}
