import { Reflection } from "../../class/Reflection";

export abstract class AbstractModulable {

    public static onInit(args:any):void{
        Reflection.runInstanceMethodByName("invoke", this, [], [args]);
    }

    public abstract invoke(...args:any):void;

    public static getClassName():string{
        return this.name;
    }

    public static getFilePath():string{
        const nodeModule = this.getNodeModule();
        return (nodeModule) ? nodeModule.filename : "";
    }

    public static getDirPath():string{
        const nodeModule = this.getNodeModule();
        return (nodeModule) ? nodeModule.path : "";
    }

    public static getNodeModule(): NodeModule | undefined{
        const nodeModule = Object.values(require.cache)
            .filter((chl) => chl?.children.includes(module))
            .filter((mn)=> mn?.filename.includes(this.name))
            .shift();
        
        return nodeModule;
    }

}