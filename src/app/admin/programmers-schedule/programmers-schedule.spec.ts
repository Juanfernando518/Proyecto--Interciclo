import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammersSchedule } from './programmers-schedule';

describe('ProgrammersSchedule', () => {
  let component: ProgrammersSchedule;
  let fixture: ComponentFixture<ProgrammersSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammersSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammersSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
