import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllServices } from './services/all-service.class';
import { CommunicationService } from './services/communication.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AllServices,
    CommunicationService
  ]
})
export class GenericModule { }
