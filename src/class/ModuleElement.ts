import { TNotations } from "../types/TNotations";

export class ModuleElement{

    public static getModuleElement(notation:TNotations, keyWord:string): string{
        switch (notation){
            case "css": 
                keyWord = `\\(\\(${keyWord}\\)\\)`;
            break;
            case "html":
                keyWord = `{{${keyWord}}}`;
            break;
            case "html-comment":
                keyWord = `<!-- {{${keyWord}}} -->`;
            break;
        }

        return keyWord;
    }

    public static getModuleElementRegex(notation:TNotations, keyWord:string): RegExp{
        keyWord = this.getModuleElement(notation, keyWord);
        return new RegExp(`${keyWord}`, 'g');
    }

}