import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var sessionActived = localStorage.getItem(Constants.STORAGE_USER_SESSION) != null;

    if (!sessionActived)
       this.route.navigate(["/login"]);

    return sessionActived;
  }

}
