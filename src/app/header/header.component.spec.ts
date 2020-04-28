import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/Authentication/auth.service';
import { WindowRef } from '../services/windowRef.service';
import { Router } from '@angular/router';
import {
  Platform,
} from '@angular/cdk/platform';
import { ProductService } from '../services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../services/storageLocalStorage.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ] ,
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [ AuthService , WindowRef  , Platform , ProductService , LocalStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
