import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './modal-confirmation.component';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmationComponent ],
      imports: [ MatDialogModule ],
      providers: [ {
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
      { provide: MAT_DIALOG_DATA, useValue: {} },] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
