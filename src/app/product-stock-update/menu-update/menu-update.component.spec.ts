import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUpdateComponent } from './menu-update.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/storageLocalStorage.service';

describe('MenuUpdateComponent', () => {
  let component: MenuUpdateComponent;
  let fixture: ComponentFixture<MenuUpdateComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUpdateComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [ MatDialog , ProductService ,  {
        provide: MatDialogRef,
        useValue: mockDialogRef
      } , AuthService , LocalStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
