import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { ProductService } from '../services/product.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/storageLocalStorage.service';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      imports: [
        ToastrModule.forRoot() 
      ],
      providers: [ ProductService , ToastrService  , LocalStorageService , AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
