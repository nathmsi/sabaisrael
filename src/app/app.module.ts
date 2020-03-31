import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http'
import { ReactiveFormsModule ,FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PopupModule } from '@progress/kendo-angular-popup';




// material ui
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// Services
import { AuthService } from './services/auth.service'
import { ProductService } from './services/product.service'
import { LocalStorageService } from './services/storageLocalStorage.service'
import { WindowRef } from './services/windowRef.service'
import { AuthGuardService } from './services/auth-guard.service'
import { ContactService } from './services/contact.service'


// Components
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AccountComponent } from './account/account.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ProductCardsComponent } from './product/product-cards/product-cards.component';
import { CardViewComponent } from './product/product-cards/card-view/card-view.component';
import { ProductFormComponent } from './product/product-form/product-form.component'
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductStockUpdateComponent } from './product-stock-update/product-stock-update.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactViewComponent } from './contact-update/contact-view/contact-view.component';
import { TableViewComponent } from './product-stock-update/table-view/table-view.component';
import { ModalImageComponent } from './product/product-cards/modal-image/modal-image.component';
import { MenuUpdateComponent } from './product-stock-update/menu-update/menu-update.component';
import { TableViewScComponent } from './shopping-cart/table-view-sc/table-view-sc.component';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';



const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'account',  component: AccountComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/update', canActivate: [AuthGuardService] , component: ProductStockUpdateComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactMeComponent },
  { path: 'contact/update',  canActivate: [AuthGuardService] , component: ContactUpdateComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: ProductComponent },
  // { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'product' }
];

const settingToastr: any = {
  timeOut: 2000,
  positionClass: 'toast-top-center',
  preventDuplicates: true,
}

const MAtModule = [
  MatBadgeModule,
  MatSelectModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatDialogModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatProgressBarModule
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    ProductCardsComponent,
    CardViewComponent,
    ProductFormComponent,
    ProductUpdateComponent,
    ProductStockUpdateComponent,
    ContactMeComponent,
    ContactUpdateComponent,
    ContactViewComponent,
    TableViewComponent,
    ModalImageComponent,
    MenuUpdateComponent,
    TableViewScComponent,
    ModalConfirmationComponent,
  ],
  imports: [
    ...MAtModule,
    CommonModule,
    BrowserModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StorageServiceModule,
    BrowserAnimationsModule, 
    PopupModule,
    ToastrModule.forRoot(settingToastr), 
    RouterModule.forRoot(appRoutes), 
  ],
  providers: [
    AuthService,
    ProductService,
    LocalStorageService,
    WindowRef,
    AuthGuardService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
