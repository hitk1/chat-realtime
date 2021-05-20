import { Component, Input, OnInit } from '@angular/core';
import { IContatoChatBox } from './contato-chat-box.interface';

@Component({
  selector: 'app-contato-chat-box',
  templateUrl: './contato-chat-box.component.html',
  styleUrls: ['./contato-chat-box.component.css']
})
export class ContatoChatBoxComponent implements OnInit {

  options: IContatoChatBox;

  @Input("options") set setOptions(value: IContatoChatBox) {
    if (!value) return;

    this.options = value;
    console.log(value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
