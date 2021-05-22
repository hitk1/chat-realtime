import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContatoCardOptions } from './contato-card.interface';

@Component({
  selector: 'app-contato-card',
  templateUrl: './contato-card.component.html',
  styleUrls: ['./contato-card.component.css']
})
export class ContatoCardComponent implements OnInit {

  options: IContatoCardOptions;

  @Output("onSelect") onSelectEmitter = new EventEmitter<IContatoCardOptions>();
  @Input("options") set setOptions(value: IContatoCardOptions) {
    if (!value) return;

    this.options = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSelectContato() { this.onSelectEmitter.emit(this.options); }
}
