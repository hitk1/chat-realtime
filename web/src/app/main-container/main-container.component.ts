import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../generic/websocket/websocket.service';
import { IContatoCardOptions } from './contato-card/contato-card.interface';
import { IContatoChatBox } from './contato-chat-box/contato-chat-box.interface';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(public socketService: WebSocketService, public route: ActivatedRoute) { }

  public listContatos: IContatoCardOptions[] = [];
  public contatoSelecionado: IContatoChatBox;

  async ngOnInit() {
    var contatosObj = <IContatoCardOptions[]>this.route.snapshot.data["contatos"].data;
    await this.socketService.connectSocket();

    if (contatosObj.length > 0) {

      for (var c of contatosObj) {
        console.log(c)
        this.listContatos.push({
          imgSrc: "https://image.flaticon.com/icons/png/512/147/147144.png",
          alias: c.alias,
          phone_number: c.phone_number,
          ultimaMsg: "Booooooora tomar uma?",
          msgNaoLidas: 1,
          horMsgNaoLida: "22:10"
        });
      }

      this.onSelectContato(this.listContatos[0]);
    }

    // this.listContatos = [
    //   {
    //     imgSrc: "https://image.flaticon.com/icons/png/512/147/147144.png",
    //     nome: "Luis Paulo",
    //     ultimaMsg: "Booooooora tomar uma?",
    //     msgNaoLidas: 1,
    //     horMsgNaoLida: "22:10"
    //   },

    //   {
    //     imgSrc: "https://www.pngix.com/pngfile/middle/5-53698_user-profile-avatar-scalable-vector-graphics-icon-woman.png",
    //     nome: "Ariane",
    //     ultimaMsg: "Booom dia!",
    //     msgNaoLidas: 0,
    //     horMsgNaoLida: "23:53"
    //   }
    // ];


  }

  onSelectContato(contato: IContatoCardOptions) {
    this.contatoSelecionado = {
      imgSrc: contato.imgSrc,
      alias: contato.alias,
    }
  }

}
