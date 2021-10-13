import { DiaDaSemana } from "../enums/dia-semana.js"
import { Negociation } from "../models/negociation.js"
import { Negociations } from "../models/negociations.js"
import { MessageView } from "../views/message-view.js"
import { NegociationsView } from "../views/negociations-view.js"

export class NegotiationController {
    private inputDate: HTMLInputElement
    private inputQuantity: HTMLInputElement
    private inputValue: HTMLInputElement
    private negociations = new Negociations()
    private negociationsView = new NegociationsView('#negociationsView', true)
    private messageView = new MessageView('#mensagemView')

    constructor() {
        this.inputDate = <HTMLInputElement>document.querySelector('#data')
        //mais recomendado para tratar o null
        this.inputQuantity = document.querySelector('#quantidade') as HTMLInputElement
        this.inputValue = document.querySelector('#valor') as HTMLInputElement
        this.negociationsView.update(this.negociations)
    }

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
        this.limpaFormulario()
        this.atualizaView()


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