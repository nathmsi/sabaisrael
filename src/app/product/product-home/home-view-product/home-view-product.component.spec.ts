import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewProductComponent } from './home-view-product.component';

describe('HomeViewProductComponent', () => {
  let component: HomeViewProductComponent;
  let fixture: ComponentFixture<HomeViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
