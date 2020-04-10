import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TehilimsComponent } from './tehilims.component';

describe('TehilimsComponent', () => {
  let component: TehilimsComponent;
  let fixture: ComponentFixture<TehilimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TehilimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TehilimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
