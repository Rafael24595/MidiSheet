import { EModules } from "../enum/EModules";
import { IModule } from "../interface/IModule";
import { join } from "path";
import { Enviroment } from "../Enviroment";
import { readFileSync } from "original-fs";

export class Modules {

    public static getModulePath(module: IModule, swExtension:boolean = true):string{
        const type = module.type;
        const name = module.name;
        const exception = module.exception;

        if(exception)
            return exception;

        let pathSection = [Enviroment.rootDir,  "modules"];
        let extension = "";

        switch(type){
            case EModules.template:
                extension = "html";
                pathSection.push("templates");
            break;
            case EModules.html:
                extension = "html";
                pathSection.push("html");
            break;
            case EModules.ts:
            case EModules.js:
                extension = "js";
                pathSection.push("js");
            break;
            case EModules.css:
                extension = "css";
                pathSection.push("css");
            break;
        }

        let extensionValue = (swExtension) ? `.${extension}` : "";

        return join(...pathSection, `${name}${extensionValue}`);
    } 

    public static readModule(module: IModule | string):string{
        let src = (typeof module != "string") ? this.getModulePath(module) : module;
        return readFileSync(src).toString();
    }

}