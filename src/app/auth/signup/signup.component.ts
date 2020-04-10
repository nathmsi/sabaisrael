import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  loadingContent: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

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
    const email = this.signupForm.get('email').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password, username).then(
      () => {
        this.loadingContent = false;
        this._snackBar.open( 'user created success ' + this.authService.user.name , 'close', {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: 'snack-error'
        });
        this.router.navigate(['/']);
      },
      (error) => {
        this.loadingContent = false;
        this.errorMessage = error;
        this._snackBar.open( error , 'close', {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: 'snack-error'
        });
      }
    );

  }

  handelSigin(){
    this.router.navigate(['auth','signin']);
  }

}
