import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockUpdateComponent } from './product-stock-update.component';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/storageLocalStorage.service';

describe('ProductStockUpdateComponent', () => {
  let component: ProductStockUpdateComponent;
  let fixture: ComponentFixture<ProductStockUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStockUpdateComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [ ProductService , MatDialog , AuthService , LocalStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStockUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
