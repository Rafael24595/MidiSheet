import { EWaves } from "../enum/EWaves";

export interface ISheet  { 
    sheet: string;
    pause?: number; 
    measurePause?: number; 
    volume?: number; 
    wave?: EWaves; 
    swExtend?: boolean; 
    swMulti?: boolean;
    swIgnore?: boolean; 
    swPrint?: boolean; 
}