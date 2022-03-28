import { AbstractView } from "./AbstractView";

export class MainView extends AbstractView{

    protected title: string = "MyMidiSheets"

    constructor(){
        super();
        this.init();
    }

}