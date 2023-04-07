import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddingModalComponent } from './user-adding-modal.component';

describe('UserAddingModalComponent', () => {
  let component: UserAddingModalComponent;
  let fixture: ComponentFixture<UserAddingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
