import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managepayment } from './managepayment';

describe('Managepayment', () => {
  let component: Managepayment;
  let fixture: ComponentFixture<Managepayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managepayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managepayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
