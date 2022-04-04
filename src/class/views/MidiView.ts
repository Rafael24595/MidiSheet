import { AbstractView } from "./AbstractView";
import { KModules } from "../../modules/KModules";
import { IModule } from "../../interface/IModule";

export class MidiView extends AbstractView{

    protected main_script: IModule = KModules.JS.midimodule;

    constructor(args?:any){
        super(args);
        this.init();
    }

}