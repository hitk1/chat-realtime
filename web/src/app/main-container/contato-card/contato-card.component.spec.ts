import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoCardComponent } from './contato-card.component';

describe('ContatoCardComponent', () => {
  let component: ContatoCardComponent;
  let fixture: ComponentFixture<ContatoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
