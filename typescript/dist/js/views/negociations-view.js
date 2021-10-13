import { View } from "./view.js";
export class NegociationsView extends View {
    template(model) {
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
                ${model.lista().map(negociation => {
            return `
                    <tr>
                        <td>${this.format(negociation.data)}</td>
                        <td>${negociation.quantity}</td>
                        <td>${negociation.value}</td>
                    </tr>
                    `;
        }).join('')}
            </tbody>
        </table>
        `;
    }
    format(date) {
        return new Intl.DateTimeFormat().format(date);
    }
}
