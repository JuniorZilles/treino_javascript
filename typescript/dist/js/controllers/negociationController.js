var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logExecutionTime } from "../decorators/log-execution-times.js";
import { DiaDaSemana } from "../enums/dia-semana.js";
import { Negociation } from "../models/negociation.js";
import { Negociations } from "../models/negociations.js";
import { NegociationsService } from "../services/negociations-service.js";
import { MessageView } from "../views/message-view.js";
import { NegociationsView } from "../views/negociations-view.js";
export class NegotiationController {
    constructor() {
        this.negociations = new Negociations();
        this.negociationsView = new NegociationsView('#negociationsView');
        this.messageView = new MessageView('#mensagemView');
        this.negociationService = new NegociationsService();
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
    importData() {
        this.negociationService.getNegociations().then(negotiacionsToday => {
            for (let neg of negotiacionsToday) {
                this.negociations.adiciona(neg);
            }
            this.negociationsView.update(this.negociations);
        });
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
__decorate([
    domInjector('#data')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantidade')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInjector('#valor')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    logExecutionTime(),
    inspect()
], NegotiationController.prototype, "adiciona", null);
