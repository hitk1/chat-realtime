import { Component, OnInit } from '@angular/core';
import { IContatoCardOptions } from './contato-card/contato-card.interface';
import { IContatoChatBox } from './contato-chat-box/contato-chat-box.interface';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  public listContatos: IContatoCardOptions[] = [];
  public contatoSelecionado: IContatoChatBox;
  constructor() { }

  ngOnInit(): void {
    this.listContatos = [
      {
        imgSrc: "https://image.flaticon.com/icons/png/512/147/147144.png",
        nome: "Tonhão",
        ultimaMsg: "Booooooora tomar uma?",
        msgNaoLidas: 1,
        horMsgNaoLida: "22:10"
      },

      {
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8K-kfbxSsaGJugBkF_sfdl1Ms1UUKcRnvRQ&usqp=CAU",
        nome: "Robert",
        ultimaMsg: "blz, man!",
        msgNaoLidas: 0,
        horMsgNaoLida: "23:53"
      }
    ];

    this.onSelectContato(this.listContatos[0]);
  }

  onSelectContato(contato: IContatoCardOptions) {
    this.contatoSelecionado = {
      imgSrc: contato.imgSrc,
      nome: contato.nome,
    }
  }

}
