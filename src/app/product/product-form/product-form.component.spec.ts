import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/storageLocalStorage.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      imports: [
        ToastrModule.forRoot() , MatDialogModule 
      ],
      providers: [ FormBuilder , ProductService , MatDialog , ToastrService , AuthService , LocalStorageService ,  {
        provide: MatDialogRef,
        useValue: mockDialogRef
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
