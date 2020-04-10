
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductFormComponent>,
  ) {

  }

  FormValidation: FormGroup;
  fileIsUploading = false;
  fileUrl: string = "";
  fileUploaded = false;
  fileDetected: File = null;
  isKippotCategorie: boolean = false;
  loadingContent: boolean = false;
  isSubCategorie: boolean = false;
  menus: string[] = [];


  ngOnInit(): void {
    this.productService.getMenus().then(
      (data: string[]) =>{
        this.menus = data;
      }
    )
    this.initForm();
  }

  initForm() {
    this.FormValidation = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', [Validators.required]],
    });
  }

  addProduct() {
    this.loadingContent = true;
    const name = this.FormValidation.get('name').value;
    const description = this.FormValidation.get('description').value;
    const price = this.FormValidation.get('price').value;
    const categorie = this.FormValidation.get('categorie').value;
    const newProduct = new Product(name, price, description, categorie);
    if (this.isKippotCategorie) {
      newProduct.size = this.FormValidation.get('size').value;
      newProduct.quality = this.FormValidation.get('quality').value;
    }
    if( this.isSubCategorie){
      newProduct.subCategorie = this.FormValidation.get('subCategorie').value;
    }
    if (this.fileUrl && this.fileUrl !== '') {
      newProduct.photo = this.fileUrl;
    }
    this.productService.createNewProduct(newProduct).then(
      () => {
        this.loadingContent = false;
        this.dialogRef.close(true);
      },
      (error) => {
        this.loadingContent = false;
        this.dialogRef.close(false);
      })
  }


  detectFiles(event) {
    this.fileDetected = event.target.files[0];
  }

  onSubmit(){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to Add this product : "
    });
    dialogRef.afterClosed().subscribe(result => {
      result &&  this.onSubmit_();
    });
  }
  
  onSubmit_() {
    this.loadingContent = true;
    if (this.fileDetected) {
      this.fileIsUploading = true;
      this.productService.uploadFile(this.fileDetected,this.FormValidation.get('categorie').value).then(
        (url: string) => {
          console.log(url);
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
          this.addProduct()
        },
        () => {
          this.loadingContent = false;
          this.dialogRef.close();
        }
      );
    }
  }

  selectOptionCategorie(value: string) {
    if (value === "Kippots") {
      this.isKippotCategorie = true;
      this.FormValidation = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        categorie: [value, Validators.required],
        price: ['', Validators.required],
        photo: ['', Validators.required],
        size: ['', Validators.required],
        quality: ['', Validators.required],
      });
    } 
    else if (value === "Breslev") {
      this.isSubCategorie = true;
      this.FormValidation = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        categorie: [value, Validators.required],
        price: ['', Validators.required],
        photo: ['', Validators.required],
        subCategorie: ['', Validators.required],
      });
    } 
    else {
      this.isSubCategorie = false;
      this.isKippotCategorie = false;
      this.FormValidation = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        categorie: [value, Validators.required],
        price: ['', Validators.required],
        photo: ['', Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
