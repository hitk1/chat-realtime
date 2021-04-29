import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoChatBoxComponent } from './contato-chat-box.component';

describe('ContatoChatBoxComponent', () => {
  let component: ContatoChatBoxComponent;
  let fixture: ComponentFixture<ContatoChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoChatBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
