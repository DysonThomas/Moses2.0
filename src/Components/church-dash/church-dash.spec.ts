import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchDash } from './church-dash';

describe('ChurchDash', () => {
  let component: ChurchDash;
  let fixture: ComponentFixture<ChurchDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchDash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
