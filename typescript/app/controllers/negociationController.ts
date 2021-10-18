import { domInjector } from "../decorators/dom-injector.js"
import { inspect } from "../decorators/inspect.js"
import { logExecutionTime } from "../decorators/log-execution-times.js"
import { DiaDaSemana } from "../enums/dia-semana.js"
import { NegotiacionsOfTheDay } from "../interfaces/negotiations_of_day.js"
import { Negociation } from "../models/negociation.js"
import { Negociations } from "../models/negociations.js"
import { NegociationsService } from "../services/negociations-service.js"
import { imprimir } from "../utils/imprimir.js"
import { MessageView } from "../views/message-view.js"
import { NegociationsView } from "../views/negociations-view.js"

export class NegotiationController {
    @domInjector('#data')
    private inputDate: HTMLInputElement
    @domInjector('#quantidade')
    private inputQuantity: HTMLInputElement
    @domInjector('#valor')
    private inputValue: HTMLInputElement
    private negociations = new Negociations()
    private negociationsView = new NegociationsView('#negociationsView')
    private messageView = new MessageView('#mensagemView')
    private negociationService = new NegociationsService()

    constructor() {
        //this.inputDate = document.querySelector('#data') as HTMLInputElement
        //mais recomendado para tratar o null
        //this.inputQuantity = document.querySelector('#quantidade') as HTMLInputElement
        //this.inputValue = document.querySelector('#valor') as HTMLInputElement
        this.negociationsView.update(this.negociations)
    }
    @logExecutionTime()
    @inspect()
    public adiciona(): void {
        const negociation = Negociation.criaDe(
            this.inputDate.value,
            this.inputQuantity.valueAsNumber,
            this.inputValue.valueAsNumber)

        if (!this.ehDiaUtil(negociation.data)) {
            this.messageView.update("Apenas dias úteis são aceitos")
            return
        }
        this.negociations.adiciona(negociation)
        imprimir(negociation, this.negociations)
        this.limpaFormulario()
        this.atualizaView()
    }

    public importData(): void {

        this.negociationService.getNegociations().then(negotiacionsToday=>{
            return negotiacionsToday.filter(negotiacionsToday=>{
                return !this.negociations.lista().some(nego => nego.ehIgual(negotiacionsToday))
            })
        })
            .then(negotiacionsToday=>{
            for(let neg of negotiacionsToday){
                this.negociations.adiciona(neg)
            }
            this.negociationsView.update(this.negociations)
        })
    }

    private ehDiaUtil(date: Date): boolean {
        return date.getDay() > DiaDaSemana.DOMINGO && date.getDay() < DiaDaSemana.SABADO
    }

    private limpaFormulario(): void {
        this.inputDate.value = ''
        this.inputQuantity.value = '0'
        this.inputValue.value = '0'
        this.inputDate.focus()
    }

    private atualizaView(): void {
        this.negociationsView.update(this.negociations)
        this.messageView.update("Salvo com sucesso")
    }
}