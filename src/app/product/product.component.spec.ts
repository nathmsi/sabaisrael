import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from '../services/windowRef.service';
import { AuthService } from '../services/Authentication/auth.service';
import { LocalStorageService } from '../services/storageLocalStorage.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        ToastrModule.forRoot()  ,MatDialogModule ,
      ],
      providers: [ ToastrService , MatDialog , ProductService , Platform , WindowRef , AuthService  , LocalStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
