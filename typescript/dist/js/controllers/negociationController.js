import { DiaDaSemana } from "../enums/dia-semana.js";
import { Negociation } from "../models/negociation.js";
import { Negociations } from "../models/negociations.js";
import { MessageView } from "../views/message-view.js";
import { NegociationsView } from "../views/negociations-view.js";
export class NegotiationController {
    constructor() {
        this.negociations = new Negociations();
        this.negociationsView = new NegociationsView('#negociationsView', true);
        this.messageView = new MessageView('#mensagemView');
        this.inputDate = document.querySelector('#data');
        this.inputQuantity = document.querySelector('#quantidade');
        this.inputValue = document.querySelector('#valor');
        this.negociationsView.update(this.negociations);
    }
    adiciona() {
        const negociation = Negociation.criaDe(this.inputDate.value, this.inputQuantity.valueAsNumber, this.inputValue.valueAsNumber);
        if (!this.ehDiaUtil(negociation.data)) {
            this.messageView.update("Apenas dias úteis são aceitos");
            return;
        }
        this.negociations.adiciona(negociation);
        this.limpaFormulario();
        this.atualizaView();
    }
    ehDiaUtil(date) {
        return date.getDay() > DiaDaSemana.DOMINGO && date.getDay() < DiaDaSemana.SABADO;
    }
    limpaFormulario() {
        this.inputDate.value = '';
        this.inputQuantity.value = '0';
        this.inputValue.value = '0';
        this.inputDate.focus();
    }
    atualizaView() {
        this.negociationsView.update(this.negociations);
        this.messageView.update("Salvo com sucesso");
    }
}
