// classe abstrata não permite criar uma instancia direta apenas dos filhos
export abstract class View<T>{
    // protected deixa acessar a variavel, mas não permite modificar ela
    protected element: HTMLElement
    private escape = false
    // parametros opcionais devem ficar ao final
    constructor(selector:string, escape?:boolean){
        const element = document.querySelector(selector)
        if (element){
            this.element = element as HTMLInputElement
        }else{
            throw Error(`Seltor ${selector} not found on DOM`)
        }
        if (escape){
            this.escape = escape
        }
    }
    public update(model:T): void{
        let template = this.template(model)
        if(this.escape){
            // remove tags script
            template = template.replace(/<cript>[\s\S]*?<\/cript>/, '')
        }
        this.element.innerHTML = template
    }

    protected abstract template(model: T): string
}