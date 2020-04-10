import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  FormValidation: FormGroup;
  fileIsUploading = false;
  fileUrl: string = "";
  fileUploaded = false;
  fileDetected: File = null;
  isKippotCategorie: boolean = false;
  isActiveTab: boolean = false;
  loadingContent: boolean = false;
  imgURLPreview: any = null ;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    let produtToUpdate = this.data;
    this.FormValidation = this.formBuilder.group({
      name: [produtToUpdate.name, Validators.required],
      description: [produtToUpdate.description, Validators.required],
      price: [produtToUpdate.price, Validators.required],
      // photo: ['', [Validators.required] ],
    });
  }

  saveProduct() {
    let produtToUpdate = this.data;
    produtToUpdate.name = this.FormValidation.get('name').value;
    produtToUpdate.description = this.FormValidation.get('description').value;
    produtToUpdate.price = this.FormValidation.get('price').value;
    if (this.fileUrl && this.fileUrl !== '') {
      produtToUpdate.photo = this.fileUrl;
    }
    this.productService.updateProduct(produtToUpdate).then(() => {
      this.loadingContent = false;
      this.dialogRef.close(true);
    },
      (error) => {
        this.loadingContent = false;
        this.dialogRef.close(false);
      }
    )
  }


  detectFiles(event) {
    this.fileDetected = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileDetected); 
    reader.onload = (_event) => { 
      this.imgURLPreview = reader.result; 
    }
  }

  onSubmit(){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to update this product : "
    });
    dialogRef.afterClosed().subscribe(result => {
      result &&  this.onSubmit_();
    });
  }

  onSubmit_() {
    this.loadingContent = true;
    if (this.fileDetected) {
      this.fileIsUploading = true;
      this.productService.updateProductImage(this.fileDetected, this.data.photo,this.data.categorie).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
          this.saveProduct();
        }
      );
    } else {
      this.saveProduct();
    }

  }

  onRemove(){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to delete this product : "
    });
    dialogRef.afterClosed().subscribe(result => {
      result &&  this.onRemove_();
    });
  }

  onRemove_() {
    this.loadingContent = true;
    this.productService.removeProduct(this.data).then(() => {
      this.loadingContent = false;
      this.dialogRef.close(true);
    },
      (error) => {
        this.loadingContent = false;
        this.dialogRef.close(false);
      }
    )
  }

  onClose() {
    this.dialogRef.close(false);
  }


}


