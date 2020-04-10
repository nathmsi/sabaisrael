import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrls: ['./menu-update.component.css']
})
export class MenuUpdateComponent implements OnInit {

  categorie: string = '';
  subCategorie: string = '';
  menus: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<MenuUpdateComponent>,
    public productService: ProductService,
    public dialog: MatDialog
  ) {
    this.productService.getMainMenus().then(
      (data: string[]) => {
        this.menus = data;
        console.log(data);
      }
    )
  }

  ngOnInit(): void {

  }

  addCategorie() {
    this.categorie !== '' && this.menus.push({
      categorie: this.categorie,
      value: [this.categorie]
    });
    this.categorie = '';
  }

  addSubCategorie(subCategorie, categorie) {
    this.menus[categorie].value.push(subCategorie);
    this.subCategorie = '';
  }

  handleDelete(index, categorie) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to delete this categorie : " + this.menus[index - 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      result && this.menus[categorie].value.splice(index, 1);
    });

  }

  handleDeleteCategorie(id) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to delete this categorie : " + this.menus[id - 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      result && this.menus.splice(id, 1);
    });
  }

  SaveMenu() {
    console.log(this.menus);
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to save  " 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.saveMenus(this.menus).then(
          (menus: string[]) => {
            this.menus = menus
            console.log('new menus ', menus);
            this.onClose(true);
          },
          (error) => {
          }
        )
      }
    });

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.menus, event.previousIndex, event.currentIndex);
  }


  onClose(flag: boolean = false) {
    this.dialogRef.close(flag);
  }

}
