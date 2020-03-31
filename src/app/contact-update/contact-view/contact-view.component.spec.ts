import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewComponent } from './contact-view.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ContactViewComponent', () => {
  let component: ContactViewComponent;
  let fixture: ComponentFixture<ContactViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactViewComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [ MatDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
