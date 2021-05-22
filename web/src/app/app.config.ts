import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { IAppConfig } from "./app.config.interface";

@Injectable()
export class AppConfig {

    static configParams: IAppConfig;
    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = "assets/config/config.json";
        return new Promise<void>((respPromise, rejPromise) => {
            this.http.get(jsonFile)
                .toPromise()
                .then((respFile: IAppConfig) => {
                    AppConfig.configParams = respFile;
                    respPromise();
                })
                .catch((respCatch: any) => {
                    rejPromise("Could not load file " + jsonFile + ". " + JSON.stringify(respCatch))
                });
        })
    }

}