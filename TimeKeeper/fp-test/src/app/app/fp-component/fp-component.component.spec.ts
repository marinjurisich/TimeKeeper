import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpComponentComponent } from './fp-component.component';

describe('FpComponentComponent', () => {
  let component: FpComponentComponent;
  let fixture: ComponentFixture<FpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
