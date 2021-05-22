import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AppConfig } from '../app.config';
import { AllServices } from '../generic/services/all-service.class';

@Injectable()
export class MainContainerResolver implements Resolve<any> {
  constructor(private allServices: AllServices) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.allServices.comnunication.getPromise(AppConfig.configParams.api.urlService + "contacts");
  }
}