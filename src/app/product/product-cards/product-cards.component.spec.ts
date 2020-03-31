import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardsComponent } from './product-cards.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ProductCardsComponent', () => {
  let component: ProductCardsComponent;
  let fixture: ComponentFixture<ProductCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardsComponent ],
      imports: [ MatDialogModule ],
      providers: [ MatDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
