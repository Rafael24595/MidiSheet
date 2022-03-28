import { app, BrowserWindow } from "electron";
import { IIpcMessage } from "../../interface/IIpcMessage";
import { IManagerOptions } from "../../interface/IManagerOptions";
import { IManagerVector } from "../../interface/IManagerVector";
import { AbstractView } from "../views/AbstractView";

export class AbstractManager {

    private swMain: boolean = false;
    private browserWindow: BrowserWindow;
    private static manager: AbstractManager;
    private static managerVector: IManagerVector = {};

    protected constructor(options?: IManagerOptions) {
       this.browserWindow = new BrowserWindow(options?.electron);
       this.swMain = (options?.swMain) ? options?.swMain : this.swMain;
       this.subscribe();
    }

    public static getInstance(idconn?:string, options?: IManagerOptions):AbstractManager{
        if(idconn == undefined && this.manager){
            return this.manager;
        }
        else if(idconn == undefined){
            idconn = this.generateIdconn(idconn);
        }

        let instance = this.managerVector[idconn];

        if(!instance){
            const swMain = AbstractManager.getMain() != undefined;
            if(swMain && options?.swMain){
                throw new Error("Main is already defined");
            }
            instance = new AbstractManager(options);
            this.manager = instance;
            this.managerVector[idconn] = instance;
        }
        return instance;
    }

    public getBrowserWindow():BrowserWindow{
        return this.browserWindow;
    }

    public isMain():boolean{
        return this.swMain;
    }

    public loadView(view:AbstractView):void{
        const file = view.getTemplate();
        this.browserWindow.loadURL(file);
    }

    public hide():void{
        if(!this.swMain){
            this.browserWindow.hide();
        }else{
            console.error("Cannot hide Main")
        } 
    }

    private subscribe():void{
        this.browserWindow.webContents.on('ipc-message', this.parentListener);
        this.browserWindow.webContents.on('ipc-message-sync', this.parentListener);
        if(this.swMain){
            this.subscribeClose();
        }
    }

    private subscribeClose():void{
        this.browserWindow.on("close", ()=>{
            app.quit();
        });
    }

    private parentListener(event:Electron.Event, messageString:string):void{
        const message = JSON.parse(messageString);
        const password = message.password;
        const data = message.data;

        switch(password){
            default:
                this.listener(message);
            break;
        }
    }

    protected listener(message:IIpcMessage):void{
        console.error(`Listener of ${this.constructor.name} is not defined`);
    }

    public send(password:string,message:any):void{
        this.browserWindow.webContents.send('ping', {password,data:message});
    }

    private static generateIdconn(idconn?:string):string{
        if(!idconn){
            idconn = `${this.constructor.name}-${Date.now()}`
        }
        return idconn;
    }

    private static getMain():AbstractManager|undefined{
        const main = Object.values(this.managerVector)
            .find(manager => manager.isMain());
        
        return main;
    }

}