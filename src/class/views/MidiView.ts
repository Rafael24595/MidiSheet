import { AbstractView } from "./AbstractView";
import { KModules } from "../../modules/KModules";
import { IModule } from "../../interface/IModule";

export class MidiView extends AbstractView{

    protected main_script: IModule = KModules.JS.midi;

    constructor(){
        super();
        this.init();
    }

    /** Override */
    protected setData():void{
        this.addAuxScripts([
            KModules.JS.electronpost
        ]);
    }

}