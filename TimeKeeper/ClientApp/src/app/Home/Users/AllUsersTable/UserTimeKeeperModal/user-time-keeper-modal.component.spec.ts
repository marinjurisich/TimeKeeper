import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeKeeperModalComponent } from './user-time-keeper-modal.component';

describe('UserTimeKeeperModalComponent', () => {
  let component: UserTimeKeeperModalComponent;
  let fixture: ComponentFixture<UserTimeKeeperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeKeeperModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTimeKeeperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
