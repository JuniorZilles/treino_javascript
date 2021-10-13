export class Negociations {
    constructor() {
        this.negociations = [];
    }
    adiciona(negociation) {
        this.negociations.push(negociation);
    }
    lista() {
        return this.negociations;
    }
}
