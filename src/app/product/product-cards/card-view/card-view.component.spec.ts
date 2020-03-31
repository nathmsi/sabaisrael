import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardViewComponent ],
      imports: [ MatDialogModule ],
      providers: [ MatDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
