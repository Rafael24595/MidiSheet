import { EModules } from "../enum/EModules";

export class KModules {
    static Templates = {
        main: {name:"mainTemplate", type:EModules.template}
    }
    static JS = {
        electronpost: {name:"MElectronPost", type:EModules.ts},
        midimodule: {name:"MMidiModule", type:EModules.ts}
    }
}