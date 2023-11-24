import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBetComponent } from './card-bet.component';

describe('CardBetComponent', () => {
  let component: CardBetComponent;
  let fixture: ComponentFixture<CardBetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBetComponent]
    });
    fixture = TestBed.createComponent(CardBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
