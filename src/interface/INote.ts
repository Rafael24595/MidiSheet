import { ENote } from "../enum/ENote";
import { EScale } from "../enum/EScale";
import { EWaves } from "../enum/EWaves";

export interface INote { 
    note:ENote;
    scale:EScale
    volume?: number; 
    wave?: EWaves; 
}