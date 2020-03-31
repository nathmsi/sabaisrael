import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewScComponent } from './table-view-sc.component';

describe('TableViewScComponent', () => {
  let component: TableViewScComponent;
  let fixture: ComponentFixture<TableViewScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
