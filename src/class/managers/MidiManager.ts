import { IIpcMessage } from "../../interface/IIpcMessage";
import { IManagerOptions } from "../../interface/IManagerOptions";
import { Sheet } from "../midi-sheet/Sheet";
import { MidiView } from "../views/MidiView";
import { AbstractManager } from "./AbsctractManager";

export class MidiManager extends AbstractManager{

    private static readonly idconn = "Midi";

    private constructor(options?: IManagerOptions){
        super(options);
    }

    public static launch(){
        const options:IManagerOptions = {
            swMain:false,
            electron:{
                webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false,}
            }
        }
    
        let instance = this.getInstance(this.idconn, options);
        instance.loadView(MidiView.start());
        //instance.hide();

        instance.getBrowserWindow().webContents.once('dom-ready', () => {
            let sheet = `
                5|e--cd-c----ce-dc---cd-e-c-------d--fa-gfe-ce-dc----cd-e-c----|
                4|--b----ba-a-----b-b-------a-a-------------------b-b-------a-a|`;

            let song = {
                sheet: sheet,
                pause: 200,
                measurePause:0,
                swIgnore:true,
                swExtend:true,
                swPrint:true
            };

            Sheet.play(song, instance);
        });        
    }

    protected listener(message:IIpcMessage):void{
        console.log(message)
    }

}