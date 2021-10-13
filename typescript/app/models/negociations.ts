import { Negociation } from "./negociation.js";

export class Negociations{
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
}