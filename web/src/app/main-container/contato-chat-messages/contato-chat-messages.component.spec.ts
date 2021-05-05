import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoChatMessagesComponent } from './contato-chat-messages.component';

describe('ContatoChatMessagesComponent', () => {
  let component: ContatoChatMessagesComponent;
  let fixture: ComponentFixture<ContatoChatMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoChatMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
