import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdateComponent } from './product-update.component';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/storageLocalStorage.service';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUpdateComponent ],
      imports: [
        ToastrModule.forRoot() , MatDialogModule
      ],
      providers: [ FormBuilder , ProductService , ToastrService , MatDialog , AuthService , LocalStorageService , {
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
      { provide: MAT_DIALOG_DATA, useValue: {} },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
