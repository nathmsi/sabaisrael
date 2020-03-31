import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUpdateComponent } from './contact-update.component';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../services/auth.service';

describe('ContactUpdateComponent', () => {
  let component: ContactUpdateComponent;
  let fixture: ComponentFixture<ContactUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUpdateComponent ],
      providers: [ContactService , AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
