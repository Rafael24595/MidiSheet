export interface IOscilatorCache {
    [key:string]:{
        context:AudioContext;
        oscilator:OscillatorNode;
    }
}