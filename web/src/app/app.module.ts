import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { GenericModule } from './generic/generic.module';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';
import { HeaderComponent } from './header/header.component';
import { ContatoCardComponent } from './main-container/contato-card/contato-card.component';
import { ContatoChatBoxComponent } from './main-container/contato-chat-box/contato-chat-box.component';
import { ContatoChatMessagesComponent } from './main-container/contato-chat-messages/contato-chat-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainContainerComponent,
    HeaderComponent,
    ContatoCardComponent,
    ContatoChatBoxComponent,
    ContatoChatMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GenericModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: InitApp,
      deps: [AppConfig], multi: true
    }    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function InitApp(appConfig: AppConfig) { return () => appConfig.load() }
