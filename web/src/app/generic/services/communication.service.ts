import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Constants } from 'src/app/constants/constants';
import { ICommunication } from '../interface/communication.interface';

@Injectable()
export class CommunicationService {

    constructor(public http: HttpClient, public router: Router) { }

    public post<TModel>(url: string, data: any): Promise<ICommunication<TModel>> {
        return new Promise((resolve) => {
            this.http.post(url, data, { headers: this.getHeader() }).subscribe(
                (response) => {
                    resolve(<ICommunication<TModel>>{
                        success: true,
                        data: response
                    });
                },
                (error) => {
                    let resultError = <ICommunication<TModel>>{
                        success: false,
                        statusCode: error.status,
                        data: error.error
                    };
                    this.errorValidate(resultError);
                    resolve(resultError);
                });
        });
    }

    public get<TModel>(url: string): Promise<ICommunication<TModel>> {
        return new Promise((resolve) => {
            this.http.get(url, { headers: this.getHeader() }).subscribe(
                (response) => {
                    resolve(<ICommunication<TModel>>{
                        success: true,
                        data: response
                    });
                },
                (error) => {
                    let resultError = <ICommunication<TModel>>{
                        success: false,
                        statusCode: error.status,
                        data: error.error
                    };

                    this.errorValidate(resultError);
                    resolve(resultError);
                });
        });
    }

    getHeader(): HttpHeaders { return new HttpHeaders().set("Authorization", "Bearer " + this.getToken()).append('Content-Type', 'application/json'); }

    public getToken() {
        let info = this.getLocalStorageToken();
        if (info) return info['access_token'];
    }

    public getUserInfo() {
        let info = this.getLocalStorageToken();
        if (info) { return { id: info["session_id"], username: info["username"], name: info["name"] }; }
    }

    private getLocalStorageToken() {
        let local = localStorage.getItem(Constants.STORAGE_USER_SESSION);
        if (isNullOrUndefined(local)) return null;
        let obj = JSON.parse(local);
        if (isNullOrUndefined(obj)) return null;
        return obj;
    }

    private errorValidate(result: any) {
        if (!result.success) {
            if (!isNullOrUndefined(result.modelState)) {
                if (result.modelState.message == "USR_LOGIN") { this.router.navigate(['/entrar']); }
                //adicionar demais erros aqui
            }
        }
    }
}