import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { WindowReference } from 'src/app/models/windowRef.model';
import { ContactService } from 'src/app/services/contact.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-order-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent  {
  @Input() onSaveForm : Function;
  @Input() user: any;
  @Input() windowRef: WindowReference;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  order: Order = new Order();
  FormValidation: FormGroup;
  validatorInvalid: boolean = false;
  isSave: boolean = false;



  constructor(
    private formBuilder: FormBuilder,
  ) {
    //this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.user);
    if(this.user !== undefined){
      this.initForm();
    }
 }

  initForm() {
    this.firstFormGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [{value: this.user.email, disabled: true}, Validators.required,Validators.email]
    });
    this.secondFormGroup = this.formBuilder.group({
      phone: ['', [Validators.required , Validators.pattern(/[0-9]{8,9}/) ]],
      address: ['', [Validators.required ,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });

    // this.FormValidation = this.formBuilder.group({
    //   name: new FormControl({value: this.user.name, disabled: true}, Validators.required),
    //   email: new FormControl({value: this.user.email, disabled: true}, [Validators.required,Validators.email]),
    //   phone: ['', Validators.required],
    //   address: ['', [Validators.required]],
    // });
  }

  onSubmit(): void {
    // if (!this.FormValidation.invalid) {
    //   this.validatorInvalid = false;
    //   this.order.name = this.FormValidation.get('name').value;
    //   this.order.email = this.FormValidation.get('email').value;
    //   this.order.phone = this.FormValidation.get('phone').value;
    //   this.order.address = this.FormValidation.get('address').value;
    //   this.onSaveForm(this.order);
    //   this.isSave = true;
    // } else {
    //   this.validatorInvalid = true;
    // }
    if (!this.firstFormGroup.invalid && !this.secondFormGroup.invalid) {
      this.isSave = true;
      this.order.name = this.firstFormGroup.get('name').value;
      this.order.email = this.firstFormGroup.get('email').value;
      this.order.phone = '+972' +this.secondFormGroup.get('phone').value;
      this.order.address = this.secondFormGroup.get('address').value;
      this.onSaveForm(this.order);
      this.isSave = true;
    } else {
      this.isSave = false;
    }
  }



}
