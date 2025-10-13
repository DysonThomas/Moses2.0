import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Churchhomepage } from './churchhomepage';

describe('Churchhomepage', () => {
  let component: Churchhomepage;
  let fixture: ComponentFixture<Churchhomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Churchhomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Churchhomepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
