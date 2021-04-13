import { Injectable } from "@angular/core";
import { CommunicationService } from "./communication.service";

@Injectable()
export class AllServices {
    constructor(public comnunication: CommunicationService) { }
}