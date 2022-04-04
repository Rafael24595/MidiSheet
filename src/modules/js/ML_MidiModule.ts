import { Sheet } from "../../class/midi-sheet/Sheet";
import { EWaves } from "../../enum/EWaves";
import { ISheet } from "../../interface/ISheet";
import { AbstractModulable } from "./AbstractModulable";


export class ML_MidiModule extends AbstractModulable{

    private static sheetInstance:Sheet;

    public invoke(...args:any): void {
    }

    public static readSheet(){
        let sheetOptions = this.getsheetData();
        
        this.resetSheet();

        this.play(sheetOptions);
    }

    private static getsheetData():ISheet{
        let sheetInput = document.getElementById("sheet-place") as HTMLInputElement;
        let pauseInput = document.getElementById("pause-place") as HTMLInputElement;
        let measureInput = document.getElementById("measure-pause-place") as HTMLInputElement;
        let volumeInput = document.getElementById("volume-place") as HTMLInputElement;
        let waveInput = document.getElementById("wave-place") as HTMLInputElement;
        let extendInput = document.getElementById("extend-place") as HTMLInputElement;
        let multiInput = document.getElementById("multisheet-place") as HTMLInputElement;

        let sheet = (sheetInput) ? sheetInput.value : "";
        let pause = (pauseInput) ? Number(pauseInput.value) : 200;
        let measure = (measureInput) ? Number(measureInput.value) : 0;
        let volume = (volumeInput) ? Number(volumeInput.value) / 100 : 0;
            volume = (volume < 0) ? 0 : volume;
            volume = (volume > 100) ? 100 : volume;
        let wave = (waveInput) ? waveInput.value as EWaves : EWaves.triangle;
            wave = (!EWaves[wave]) ? EWaves.triangle : wave; 
        let extend = extendInput.checked;
        let multi = multiInput.checked;

        return {
            sheet:sheet,
            pause:pause,
            measurePause:measure,
            volume:volume,
            wave:wave,
            swExtend:extend,
            swMulti:multi,
            swPrint:true
        };
    }

    private static resetSheet():void{
        if(this.sheetInstance && this.sheetInstance.isPlaying())
            this.sheetInstance.stop();
    }

    public static pauseSheet():void{
        //if(this.sheetInstance)
            //MSMidiModule.sheetInstance.pause();
    }

    public static stopSheet():void{
        if(this.sheetInstance)
        ML_MidiModule.sheetInstance.stop();
    }

    public static play(sheet:ISheet){
        ML_MidiModule.sheetInstance = Sheet.play(sheet);
    }
}