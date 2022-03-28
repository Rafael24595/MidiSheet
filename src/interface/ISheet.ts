import { EWaves } from "../enum/EWaves";

export interface ESheet  { 
    sheet: string;
    pause?: number; 
    measurePause?: number; 
    volume?: number; 
    wave?: EWaves; 
    swExtend?: boolean; 
    swIgnore?: boolean; 
    swPrint?: boolean; 
}