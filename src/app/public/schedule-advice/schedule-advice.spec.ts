import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAdvice } from './schedule-advice';

describe('ScheduleAdvice', () => {
  let component: ScheduleAdvice;
  let fixture: ComponentFixture<ScheduleAdvice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAdvice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAdvice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
