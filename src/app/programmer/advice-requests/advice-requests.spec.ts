import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceRequests } from './advice-requests';

describe('AdviceRequests', () => {
  let component: AdviceRequests;
  let fixture: ComponentFixture<AdviceRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdviceRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviceRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
