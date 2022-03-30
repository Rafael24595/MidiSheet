import { TAbsClass, TClass } from "../types/TClass";

export class Reflection {

    /**
     * @param clazz Clase que se busca instanciar
     * @param args Argumentos que debe recibir la clase que se va a instanciar
     * @returns instance
     * @Description
     * Devuelve una instancia de la clase indicada
    */
    public static invoke<T>(clazz:TClass, args:any = []):T{
        try {
            return new clazz(...args);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0004, clazz.name, error);
        }
    }

    /**
     * @param clazz Clase que se busca instanciar
     * @param args Argumentos que debe recibir la clase que se va a instanciar
     * @returns instance
     * @Description
     * Devuelve una instancia de la clase indicada
    */
     public static invokeAbs<T>(clazz:TAbsClass, args:any = []):T{
        try {
            let anyClass = clazz as any;
            return new anyClass(...args);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0004, clazz.name, error);
        }
    }

    /**
     * @param methodName Nombre del método instanciado a buscar
     * @param instance Instancia de una determinada clase
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
     * @Description
     * Llama a un método de la instancia
    */
    public static async runMyInstanceMethodByNameSync<T>(methodName:string, instance:Object, methodArgs:any = []):Promise<T>{
        try {
            let anyInstance = instance as any;
            return await anyInstance[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${instance.constructor.name}`, error);
        }
    }

    /**
     * @param methodName Nombre del método instanciado a buscar
     * @param instance Instancia de una determinada clase
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
     * @Description
     * Llama a un método de la instancia
    */
    public static runMyInstanceMethodByName<T>(methodName:string, instance:Object, methodArgs:any = []):Promise<T>{
        try {
            let anyInstance = instance as any;
            return anyInstance[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${instance.constructor.name}`, error);
        }
    }

    /**
     * @param methodName Nombre del método instanciado a buscar
     * @param clazz Clase en la que se va a buscar el método
     * @param clazzArgs Argumentos que debe recibir la clase que se va a instanciar
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
     * @Description
     * Va a crear una instancia de la clase que se le pasa y va a llamar al método. Se soportan las llamadas desde clases abstractas.
    */
    public static async runInstanceMethodByNameSync<T>(methodName:string, clazz:TClass | TAbsClass, clazzArgs:any = [], methodArgs:any = []):Promise<T>{
        try {
            let instance;

            if("new" in clazz){
                instance = this.invoke(clazz, clazzArgs) as any;
            }else{
                instance = this.invokeAbs(clazz, clazzArgs) as any;
            }
            return await instance[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
           // throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${clazz.name}`, error);
        }
    }

    /**
     * @param methodName Nombre del método instanciado a buscar
     * @param clazz Clase en la que se va a buscar el método
     * @param clazzArgs Argumentos que debe recibir la clase que se va a instanciar
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
     * @Description
     * Va a crear una instancia de la clase que se le pasa y va a llamar al método. se soportan las llamadas desde clases abstractas.
    */
    public static runInstanceMethodByName<T>(methodName:string, clazz:TClass | TAbsClass, clazzArgs:any = [], methodArgs:any = []):T{
        try {
            let instance;

            if("new" in clazz){
                instance = this.invoke(clazz, clazzArgs) as any;
            }else{
                instance = this.invokeAbs(clazz, clazzArgs) as any;
            }
                
            return instance[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
           // throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${clazz.name}`, error);
        }
    }

    /**
     * @param methodName Nombre del método estático a buscar
     * @param instance Instancia de una determinada clase
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
    */
     public static async runStaticMethodFromMyInstanceSync<T>(methodName:string, instance:Object, methodArgs:any = []):Promise<T>{
        try {
            let anyInstance = instance as any;
            return await anyInstance.constructor[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
           // throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${instance.constructor.name}`);
        }
    }

    /**
     * @param methodName Nombre del método estático a buscar
     * @param instance Instancia de una determinada clase
     * @param methodArgs Argumentos que debe recibir el método
     * @returns any
    */
     public static runStaticMethodFromMyInstance<T>(methodName:string, instance:Object, methodArgs:any = []):T{
        try {
            let anyInstance = instance as any;
            return anyInstance.constructor[methodName](...methodArgs);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${instance.constructor.name}`);
        }
    }

    /**
     * @param methodName Nombre del método estático a buscar
     * @param clazz Clase en la que se va a buscar el método
     * @param args Argumentos que debe recibir el método
     * @returns any
     * @Description
     * Debe usarse cuando el método es asíncrono
    */
    public static async runMethodByNameSync<T>(methodName:string, clazz:TClass, args:any = []):Promise<T>{
        try {
            let anyClass = clazz as any;
            return await anyClass[methodName](...args);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${clazz.name}`, error);
        }
    }

    /**
     * @param methodName Nombre del método estático a buscar
     * @param clazz Clase en la que se va a buscar el método
     * @param args Argumentos que debe recibir el método
     * @returns any
    */
    public static runMethodByName<T>(methodName:string, clazz:TClass, args:any = []):T{
        try {
            let anyClass = clazz as any;
            return anyClass[methodName](...args);
        } catch (error) {
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0002, `${methodName} of ${clazz.name}`);
        }
    }

    /**
     * @param varName Nombre de la variable
     * @param clazz Clase en la que se va a buscar la variable
     * @param ignore Indica si se quiere ignorar la existencia de la variable
     * @returns any
     * @Description
     * Si la varible a buscar no está inicializada al menos con valor "undefined"
     * y no se ha indicado que se ignore su existencia lanzará error.
    */
    public static getStaticVarByName<T>(varName:string, clazz:TClass, ignore:boolean = false):T{
        let anyClass = clazz as any;
        const varr = anyClass[varName];
        if(!ignore && !this.methodExists(varName, clazz)){
            throw new Error("");
            //throw new NewsletterException(KNewsletterExceptions.NLE0005, `${varName} of ${clazz.name}`);
        }
        return varr;
    }

    /**
     * @param varName Nombre de la variable
     * @param clazz Clase en la que se va a buscar la variable
     * @param value Valor que tomará la variable
     * @param ignore Indica si se quiere ignorar la existencia de la variable
     * @returns void
     * @Description
     * Si la varible a buscar no está inicializada al menos con valor "undefined"
     * y no se ha indicado que se ignore su existencia lanzará error.
    */
    public static setStaticVarByName<T>(varName:string, clazz:TClass, value:any, ignore:boolean = false):void{
        if(!ignore && !this.methodExists(varName, clazz)){
            // throw new NewsletterException(KNewsletterExceptions.NLE0005, `${varName} of ${clazz.name}`);
        }
        let anyClass = clazz as any;
        anyClass[varName] = value;
    }

    /**
     * @param methodName Nombre de la variable o método a buscar (Debe estar definido)
     * @param clazz Clase en la que se va a buscar
     * @returns boolean
    */
    public static methodExists(methodName:string, clazz:TClass):boolean{
        return Object.keys(clazz).includes(methodName);
    }

}