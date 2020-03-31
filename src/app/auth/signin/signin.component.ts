import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  loadingContent: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }
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
      this.toastr.success('welcome ' + this.authService.user.name);
      this.loadingContent = false;
      this.router.navigate(['/']);
    }, (error) => {
      this.loadingContent = false;
      this.errorMessage = error;
      this.toastr.error(error);
    });
  }

  handelSigUp(){
    this.router.navigate(['auth','signup']);
  }



}
