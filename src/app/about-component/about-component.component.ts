import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css']
})
export class AboutComponentComponent  {

  FormValidation: FormGroup;
  validatorInvalid: boolean = false;
  loadingContent: boolean = false;
  seachValue: string = "";

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  initForm() {
    this.FormValidation = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      mobile: ['', Validators.required],
      subject: ['',],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.FormValidation.invalid) {
      this.validatorInvalid = false;
      this.loadingContent = true;
      const name = this.FormValidation.get('name').value;
      const email = this.FormValidation.get('email').value;
      const mobile = this.FormValidation.get('mobile').value;
      const subject = this.FormValidation.get('subject').value;
      const message = this.FormValidation.get('message').value;
      console.log(
        name,
        email,
        mobile,
        subject,
      )
    } else {
      this.validatorInvalid = true;
    }
  }

  handleSearch(){
    console.log(this.seachValue);
  }

  ngOnDestroy() {
    
  }

}
