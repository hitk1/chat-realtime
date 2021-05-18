import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../generic/websocket/websocket.service';
import { IContatoCardOptions } from './contato-card/contato-card.interface';
import { IContatoChatBox } from './contato-chat-box/contato-chat-box.interface';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(public socketService: WebSocketService) { }
  
  public listContatos: IContatoCardOptions[] = [];
  public contatoSelecionado: IContatoChatBox;

  async ngOnInit()  {
    await this.socketService.connectSocket();

    this.listContatos = [
      {
        imgSrc: "https://image.flaticon.com/icons/png/512/147/147144.png",
        nome: "Luis Paulo",
        ultimaMsg: "Booooooora tomar uma?",
        msgNaoLidas: 1,
        horMsgNaoLida: "22:10"
      },

      {
        imgSrc: "https://www.pngix.com/pngfile/middle/5-53698_user-profile-avatar-scalable-vector-graphics-icon-woman.png",
        nome: "Ariane",
        ultimaMsg: "Booom dia!",
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
