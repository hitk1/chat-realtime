import { AppConfig } from "../app.config";

export class ParentClass<T>{

    constructor() { }
    
    getUrlService(api: string) { return AppConfig.configParams.api.urlService + api }
}