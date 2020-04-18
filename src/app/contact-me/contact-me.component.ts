import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowRef } from '../services/windowRef.service';
import { Subscription } from 'rxjs';
import { WindowReference } from '../models/windowRef.model';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {
  contact: Contact = new Contact();
  FormValidation: FormGroup;
  validatorInvalid: boolean = false;
  loadingContent: boolean = false;

  subscription: Subscription;
  windowRef: WindowReference;


  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private _snackBar: MatSnackBar,
    private windowReferService: WindowRef
  ) {
    this.initForm();
    this.subscription = this.windowReferService.windowSubject.subscribe(
      (windowRef: WindowReference) =>{
        this.windowRef = windowRef;
      }
    )
    this.windowReferService.emitWindowRef();
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
      this.contact.name = this.FormValidation.get('name').value;
      this.contact.email = this.FormValidation.get('email').value;
      this.contact.mobile = this.FormValidation.get('mobile').value;
      this.contact.subject = this.FormValidation.get('subject').value;
      this.contact.message = this.FormValidation.get('message').value;


      this.contactService.createNewContact(this.contact).then(
        () => {
          this.loadingContent = false;
          this.initForm();
          this._snackBar.open('Your message has been sent', 'close');
          console.log('success');
        },
        (error) => {
          this.loadingContent = false;
          console.log('error');
        }
      )
    } else {
      this.validatorInvalid = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}
