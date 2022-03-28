import { app } from "electron";
import { MainManager } from "./class/managers/MainManaget";
import { MidiManager } from "./class/managers/MidiManager";

app.on("ready", () => {

    MainManager.launch();    
    MidiManager.launch();

});