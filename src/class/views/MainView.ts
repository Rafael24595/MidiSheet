import { EWaves } from "../../enum/EWaves";
import { IModule } from "../../interface/IModule";
import { KGrooves } from "../../modules/grooves/KGrooves";
import { MainTemplate } from "../../modules/grooves/templates/MainTemplate";
import { MMidiModule } from "../../modules/js/MMidiModule";
import { KModules } from "../../modules/KModules";
import { Modules } from "../../modules/Modules";
import { AbstractView } from "./AbstractView";

export class MainView extends AbstractView{

    protected title: string = "MyMidiSheets"
    protected groove_template: string[] = MainTemplate;
    protected main_script: IModule = KModules.JS.midimodule;

    constructor(){
        super();
        this.init();
    }

    protected printMain():void{
        this.printModuleInput();
    }

    private printModuleInput():void{
        let module = Modules.readModule(KModules.HTML.main_input_text_area);

        module = this.printModule(module, [
            {name: "callback_play", content:this.getCallBack(MMidiModule, "readSheet"), notation:"html"},
            {name: "callback_stop", content:this.getCallBack(MMidiModule, "stopSheet"), notation:"html"},
            {name: "wave-select", content:this.getSelectOptions([
                {name:EWaves.triangle, value:EWaves.triangle, selected:false},
                {name:EWaves.sawtooth, value:EWaves.sawtooth},
                {name:EWaves.sine, value:EWaves.sine},
                {name:EWaves.square, value:EWaves.square},
            ]), notation:"html"}
        ]);

        this.printData([
            {name: KGrooves.grooves.input_text_area, content:module, notation:"html"}
        ]); 
    }

}