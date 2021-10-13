import { Negociations } from "../models/negociations.js"
import { View } from "./view.js"

export class NegociationsView extends View<Negociations>{
    
    protected template(model:Negociations):string{
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(negociation =>{
                    return `
                    <tr>
                        <td>${this.format(negociation.data)}</td>
                        <td>${negociation.quantity}</td>
                        <td>${negociation.value}</td>
                    </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        `
    }

    private format(date:Date): string {
        return new Intl.DateTimeFormat().format(date)
    }
}