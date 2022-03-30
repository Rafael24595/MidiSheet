import { Sheet } from "../../class/midi-sheet/Sheet";
import { AbstractModulable } from "./AbstractModulable";


export class MMidiModule extends AbstractModulable{

    public invoke(): void {
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

        //Sheet.play(song);
    }

}