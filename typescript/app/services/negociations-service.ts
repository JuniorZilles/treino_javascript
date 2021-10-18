import { NegotiacionsOfTheDay } from "../interfaces/negotiations_of_day.js";
import { Negociation } from "../models/negociation.js";

export class NegociationsService{
    public getNegociations():Promise<Negociation[]>{
        return fetch('http://localhost:8080/dados').then(res =>
            res.json()
        ).then((dados: NegotiacionsOfTheDay[]) => {
            return dados.map(dado => {
                return new Negociation(new Date(), dado.vezes, dado.montante)
            })
        })
    }
}