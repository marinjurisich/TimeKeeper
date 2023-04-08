import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditingModalComponent } from './user-editing-modal.component';

describe('UserEditingModalComponent', () => {
  let component: UserEditingModalComponent;
  let fixture: ComponentFixture<UserEditingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
