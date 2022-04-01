import { EModules } from "../enum/EModules";
import { ML_MidiModule } from "./js/ML_MidiModule";

export class KModules {
    static Templates = {
        main: {name:"mainTemplate", type:EModules.template}
    }
    static HTML = {
        main_input_text_area: {name:"main_input-text-area", type:EModules.html}
    }
    static CSS = {
        midimodule: {name:"MS_MidiModule", type:EModules.css}
    }
    static JS = {
        midimodule: {name:ML_MidiModule.getClassName(), type:EModules.ts, exception:ML_MidiModule.getFilePath()}
    }
}