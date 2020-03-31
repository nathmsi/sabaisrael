import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageComponent } from './modal-image.component';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalImageComponent', () => {
  let component: ModalImageComponent;
  let fixture: ComponentFixture<ModalImageComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageComponent ],
      providers: [  {
        provide: MatDialogRef,
        useValue: mockDialogRef
      } ,
      { provide: MAT_DIALOG_DATA, useValue: {} },
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
