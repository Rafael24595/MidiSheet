import { EModules } from "../enum/EModules";

export class KModules {
    static Templates = {
        main: {name:"mainTemplate", type:EModules.template}
    }
    static JS = {
        midi: {name:"MIDI", type:EModules.js},
        electronpost: {name:"ElectronPost", type:EModules.js}
    }
}