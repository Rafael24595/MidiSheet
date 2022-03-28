import { EModules } from "../enum/EModules";

export interface IModule {
    type:EModules,
    name:string,
    exception?:string
}