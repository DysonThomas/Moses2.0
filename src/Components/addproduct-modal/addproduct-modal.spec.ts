import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductModal } from './addproduct-modal';

describe('AddproductModal', () => {
  let component: AddproductModal;
  let fixture: ComponentFixture<AddproductModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddproductModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
