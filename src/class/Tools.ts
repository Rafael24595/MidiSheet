export class Tools {

    public static isEmptyNumber(value:number | undefined):boolean{
        return (value == undefined)
    }

    public static isWholeNumber(value:number | undefined):boolean{
        return (value != undefined && value >= 0)
    }

}