import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrls: ['./menu-update.component.css']
})
export class MenuUpdateComponent implements OnInit {

  categorie: string = '';
  menus: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MenuUpdateComponent>,
    public productService: ProductService,
    public dialog: MatDialog
  ) {
    this.productService.getMenus().then(
      (data: string[]) => {
        this.menus = data;
      }
    )
  }

  ngOnInit(): void {

  }

  addCategorie() {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to add this categorie : " + this.categorie
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categorie !== '' && this.menus.push(this.categorie);
        this.categorie = '';
        this.SaveMenu();
      }
    });
  }

  handleDelete(index) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to delete this categorie : " + this.menus[index - 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      result &&  this.menus.splice(index, 1) , this.SaveMenu();
    });

  }

  SaveMenu() {
    console.log(this.menus);
    this.productService.saveMenus(this.menus).then(
      (menus: string[]) => {
        this.menus = menus
        console.log('new menus ', menus);
      },
      (error) => {

      }
    )
  }

  onClose() {
    this.dialogRef.close();
  }

}
