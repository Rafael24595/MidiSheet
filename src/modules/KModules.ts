import { EModules } from "../enum/EModules";
import { MMidiModule } from "./js/MMidiModule";

export class KModules {
    static Templates = {
        main: {name:"mainTemplate", type:EModules.template}
    }
    static JS = {
        midimodule: {name:MMidiModule.getClassName(), type:EModules.ts, exception:MMidiModule.getFilePath()}
    }
}