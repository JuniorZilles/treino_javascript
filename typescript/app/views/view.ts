// classe abstrata não permite criar uma instancia direta apenas dos filhos
export abstract class View<T>{
    // protected deixa acessar a variavel, mas não permite modificar ela
    protected element: HTMLElement
    // parametros opcionais devem ficar ao final
    constructor(selector:string){
        const element = document.querySelector(selector)
        if (element){
            this.element = element as HTMLInputElement
        }else{
            throw Error(`Selector ${selector} not found on DOM`)
        }
        
    }

    public update(model:T): void{
        let template = this.template(model)
        this.element.innerHTML = template
    }

    protected abstract template(model: T): string
}