import { EScale } from "../../enum/EScale";
import { EWaves } from "../../enum/EWaves";
import { INote } from "../../interface/INote";
import { IOscilatorCache } from "../../interface/IOscilatorCache";

export class MIDI {

    public static dir = __filename;
    public static readonly oscilatorLimit = 10;
    public static oscilatorCache:IOscilatorCache = {};

    private oscilator!: OscillatorNode;
    private readonly id:string;
    private readonly volumeDef = 0.25;
    private readonly hzDef = EScale.S4;
    private readonly waveDef = EWaves.triangle;
    
    public constructor(){
        this.id = `oscilator-${Date.now()}`;
    }

    public static start(note:INote, finish:number, priority = false): MIDI | null{
        if(Object.keys(MIDI.oscilatorCache).length < MIDI.oscilatorLimit || priority){
            let midi = new MIDI();
            midi.play(note, finish);
            return midi; 
        }
        return null;
    }

    public static async startSync(note:INote, finish:number, priority = false): Promise<MIDI | null> {
        if(Object.keys(MIDI.oscilatorCache).length < MIDI.oscilatorLimit || priority){
            let midi = new MIDI();
            await midi.playAsync(note, finish);
            return midi;
        }
        return null;
    }

    public static async pauseSync(finish: number): Promise<void>{
        return await new Promise(resolve=>{
            setTimeout(() => {
                return resolve();
            }, finish);
        });
    }

    private setOscilator(noteData:INote): void{
        let note = noteData.note;
        let scale = (noteData.scale == null) ? this.hzDef : noteData.scale;
        let volume = (noteData.volume == null) ? this.volumeDef : noteData.volume;
        let wave = (noteData.wave == null) ? this.waveDef : noteData.wave;
        let context = new AudioContext();
        /*f = 2^((note-69)/12) * scale Hz*/
        let proccesedNote = Math.pow(2, (note-69)/12)*scale;
        this.oscilator = context.createOscillator();
        this.oscilator.frequency.setTargetAtTime(proccesedNote, context.currentTime, 0);
        this.oscilator.type = wave as OscillatorType;

        var volumeGain = context.createGain();
        volumeGain.connect(context.destination);
        volumeGain.gain.value = volume;

        /*context.destination*/
        this.oscilator.connect(volumeGain);
        this.oscilator.start(0);
        MIDI.oscilatorCache[this.id] = {context:context,oscilator:this.oscilator};
    }

    private setFinish(finish: number):void{
        if(finish && finish > 0){
            setTimeout(this.stop.bind(this), finish);
        }
    }

    private play(note:INote, finish:number):void {
        this.setOscilator(note);
        this.setFinish(finish);
    }

    private async playAsync(note:INote, finish:number): Promise<void> {
        return new Promise(resolve=>{
            this.setOscilator(note);
            if(finish && finish > 0){
                setTimeout(()=>{
                    this.stop();
                    return resolve();
                }, finish);
            }
        });
    }

    private stop(): void{
        if(this.oscilator)
            this.oscilator.stop(0);
            let ac = MIDI.oscilatorCache[this.id].context;
            setTimeout(()=>{
                ac.close();
            }, 500);
            delete MIDI.oscilatorCache[this.id];
    }
}