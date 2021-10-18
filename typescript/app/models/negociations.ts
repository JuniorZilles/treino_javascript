import { Modelo } from "../interfaces/modelo.js";
import { Negociation } from "./negociation.js";

export class Negociations implements Modelo<Negociations>{
   
    private negociations:Negociation[] = []

    public adiciona(negociation:Negociation):void{
        this.negociations.push(negociation)
    }
    // ReadonlyArray bloqueia todos os methodos que modifiquem o conteúdo da lista
    // readonly bloqueia todos os methodos que modifiquem o conteúdo da lista
    public lista():readonly Negociation[]{
        // ... spread operator diz que cada elemento da lista indicada sera adicionada na nova lista
        //return [...this.negociations]
        return this.negociations
    }

    public toText():string{
        return JSON.stringify(this.negociations, null, 2)
    }

    public ehIgual(objeto: Negociations): boolean {
        return JSON.stringify(this.negociations) === JSON.stringify(objeto.lista())
    }
}