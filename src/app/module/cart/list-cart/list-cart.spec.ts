import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCart } from './list-cart';

describe('ListCart', () => {
  let component: ListCart;
  let fixture: ComponentFixture<ListCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
