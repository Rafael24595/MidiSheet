import { ENote } from "../../enum/ENote";
import { EScale } from "../../enum/EScale";
import { EWaves } from "../../enum/EWaves";
import { ISheet } from "../../interface/ISheet";
import { MIDI } from "./MIDI";

export class Sheet {

    private threads!: string[][];
    private defaultPause;
    private measurePause;
    private volume;
    private wave;
    private swExtend;
    private swIgnore;
    private swPrint;
    private playingCount!: number;
    private swPause = false;

    public constructor(data:ISheet){
        this.defaultPause = (data.pause) ? data.pause : 200;
        this.measurePause = (data.measurePause) ? data.measurePause : this.defaultPause;
        this.volume = data.volume;
        this.wave = data.wave;
        this.swExtend = data.swExtend;
        this.swIgnore = data.swIgnore;
        this.swPrint = data.swPrint;
    }

    public static play(data:ISheet): Sheet{
        let instance = new Sheet(data);
        instance.read(data);
        instance.replay();
        return instance;
    }

    public stop():void{
        if(!this.swPause && this.threads.length > 0)
            this.swPause = true;
    }

    private read(data:ISheet): void{
        let sections = data.sheet.split("\n");
    
        this.threads = sections
            .map(sections => sections.trim())
            .filter(section => section != "")
            .map(section => section.split(""));
    }
    
    public replay(): void{
        this.playingCount = this.threads.length;
        this.swPause = false;
        for(let thread of this.threads){
            let scaleValue = thread.shift();
            let scaleKey = <keyof typeof EScale> `S${scaleValue}`;
            let scale = EScale[scaleKey];
            if(scaleValue){
                this.watchThread(thread, scale);
            }
        }
    }

    private async watchThread(thread:string[], scale:EScale):Promise<void>{
        await this.playThread(thread, scale);

        if(this.playingCount == 0){
            this.swPause = false;
            throw new Error("Sheet thread error");
        }
           
        this.playingCount = this.playingCount -1; 

        if(this.swPause && this.playingCount == 0){
            this.swPause = false;
        }
    }

    private async playThread(thread:string[], scale:EScale): Promise<void>{
        for (const [index, note] of thread.entries()) {
            if(this.swPause)
                return;
            switch (note) {
                case "/":
                break;
                case "_":
                    await MIDI.pauseSync(this.defaultPause/2);
                break;
                case "|":
                    await MIDI.pauseSync(this.measurePause*2);
                break;
                case "-":
                    await MIDI.pauseSync(this.defaultPause);
                break;
                default:
                    let pause = this.checkNext(thread,index);
                    let noteKey = null;           
                    let noteValue = null;

                    if(note == note.toLowerCase()){
                        noteKey = <keyof typeof ENote> `${note.toUpperCase()}1`;
                    }
                    else{
                        noteKey = <keyof typeof ENote> `${note.toUpperCase()}$`;
                    }

                    noteValue = ENote[noteKey];

                    if(noteValue){
                        this.print(scale, note, pause);
                        await MIDI.startSync({note:noteValue,scale:scale,wave:this.wave,volume:this.volume}, pause, this.swIgnore);
                    }
                break;
            }
        }
    }
    
    private print(scale:EScale, note:string, pause:number): void{
        if(this.swPrint){
            let scaleName = Object.keys(EScale).find(key=>EScale[<keyof typeof EScale> key] == scale);
            let waveName = (this.wave) ? Object.keys(EWaves).find(key=>EWaves[<keyof typeof EWaves> key] == this.wave) : "default";

            console.log(`Frecuency: ${scale}(${scaleName}) - Note: ${note} - Time: ${pause}ms - Wave: ${waveName}`);
        }
    }

    private checkNext(thread:string[], index:number): number{
        let pause = this.defaultPause;
        let nextNote = thread[index+1];
        if(nextNote){
            switch (nextNote) {
                case "-":
                    return this.checkSwExtend(thread,index);
                case "+":
                    return this.checkHold(thread,pause,index);
            }
        }
        return pause;
    }

    private checkSwExtend(thread:string[], index:number): number{
        if(this.swExtend){
            thread[index+1] = "_";
            return this.defaultPause * 1.5;
        }
        return this.defaultPause;
    }

    private checkHold(thread:string[], pause:number, index:number): number{
        let nextNote = thread[index+1];
        if(nextNote && nextNote == "+"){
            pause = pause + this.defaultPause;
            thread[index+1] = "/";
            pause = this.checkHold(thread, pause, index+1);
        }
        return pause;
    }

    public isPlaying():boolean{
        return this.playingCount > 0;
    }

}