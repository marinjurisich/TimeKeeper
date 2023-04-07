import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersStatisticsComponent } from './all-users-statistics.component';

describe('AllUsersStatisticsComponent', () => {
  let component: AllUsersStatisticsComponent;
  let fixture: ComponentFixture<AllUsersStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUsersStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
