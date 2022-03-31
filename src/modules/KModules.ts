import { EModules } from "../enum/EModules";
import { MMidiModule } from "./js/MMidiModule";

export class KModules {
    static Templates = {
        main: {name:"mainTemplate", type:EModules.template}
    }
    static HTML = {
        main_input_text_area: {name:"main_input-text-area", type:EModules.html}
    }
    static JS = {
        midimodule: {name:MMidiModule.getClassName(), type:EModules.ts, exception:MMidiModule.getFilePath()}
    }
}