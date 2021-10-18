import { Negociation } from "../models/negociation.js";
export class NegociationsService {
    getNegociations() {
        return fetch('http://localhost:8080/dados').then(res => res.json()).then((dados) => {
            return dados.map(dado => {
                return new Negociation(new Date(), dado.vezes, dado.montante);
            });
        });
    }
}
