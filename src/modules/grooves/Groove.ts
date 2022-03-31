export class Groove {

    public static getGroove(id:string):string{
        return `
            <!-- ${id} -->
                {{${id}}}
            <!-- ${id} -->`;
    }

}